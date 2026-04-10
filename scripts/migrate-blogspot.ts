#!/usr/bin/env bun
/**
 * Migration script: Blogspot → MDX archive
 *
 * Fetches all posts and comments from the Blogspot Atom feed,
 * downloads images, converts HTML to MDX, and writes files to content/archive/.
 *
 * Usage: bun run scripts/migrate-blogspot.ts
 */

import fs from 'fs/promises';
import path from 'path';

const BLOG_URL = 'https://raviatluri.blogspot.com';
const POSTS_FEED = `${BLOG_URL}/feeds/posts/default?alt=json`;
const COMMENTS_FEED = `${BLOG_URL}/feeds/comments/default?alt=json`;
const ARCHIVE_DIR = path.join(process.cwd(), 'content/archive');
const IMAGES_DIR = path.join(process.cwd(), 'public/images/archive');

// ─── Types ───────────────────────────────────────────────────────────────────

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  tags: string[];
  url: string;
  comments: BlogComment[];
}

interface BlogComment {
  author: string;
  avatarUrl: string;
  content: string;
  date: string;
  postId: string;
}

// ─── Fetch helpers ───────────────────────────────────────────────────────────

async function fetchAllPages(feedUrl: string, label: string) {
  const entries: any[] = [];
  let startIndex = 1;
  const pageSize = 150;

  while (true) {
    const url = `${feedUrl}&max-results=${pageSize}&start-index=${startIndex}`;
    console.log(`  Fetching ${label} page (start-index=${startIndex})...`);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);

    const data = await res.json();
    const feed = data.feed;
    const total = parseInt(feed.openSearch$totalResults.$t, 10);
    const pageEntries = feed.entry || [];

    entries.push(...pageEntries);
    console.log(`  Got ${pageEntries.length} entries (${entries.length}/${total} total)`);

    if (entries.length >= total || pageEntries.length === 0) break;
    startIndex += pageEntries.length;
  }

  return entries;
}

// ─── Parse posts ─────────────────────────────────────────────────────────────

function extractSlug(entry: any): string {
  const altLink = entry.link?.find((l: any) => l.rel === 'alternate');
  if (altLink) {
    const url = altLink.href;
    const match = url.match(/\/([^/]+)\.html$/);
    if (match) return match[1];
  }
  // Fallback: slugify title
  return entry.title.$t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractPostId(entry: any): string {
  // ID format: tag:blogger.com,1999:blog-BLOGID.post-POSTID
  const id = entry.id.$t;
  const match = id.match(/post-(\d+)/);
  return match ? match[1] : id;
}

function parsePosts(entries: any[]): BlogPost[] {
  return entries.map(entry => {
    const altLink = entry.link?.find((l: any) => l.rel === 'alternate');
    return {
      id: extractPostId(entry),
      title: entry.title.$t,
      slug: extractSlug(entry),
      date: entry.published.$t.split('T')[0],
      content: entry.content?.$t || entry.summary?.$t || '',
      tags: (entry.category || []).map((c: any) => c.term),
      url: altLink?.href || '',
      comments: [],
    };
  });
}

// ─── Parse comments ──────────────────────────────────────────────────────────

const SPAM_PATTERNS = [
  /erectile/i,
  /viagra/i,
  /casino/i,
  /buy\s+cheap/i,
  /click\s+here\s+to\s+visit/i,
  /seo\s+services/i,
  /payday\s+loan/i,
  /weight\s+loss/i,
  /diet\s+pill/i,
  /best\s+\w+\s+pills/i,
  /expert\s+view\s+regarding\s+blogging/i,
];

function isSpam(text: string, author: string): boolean {
  const combined = `${author} ${text}`;
  return SPAM_PATTERNS.some(p => p.test(combined));
}

function isRemovedComment(text: string): boolean {
  return /removed by the author|removed by a blog administrator/i.test(text);
}

function parseComments(entries: any[]): BlogComment[] {
  return entries
    .map(entry => {
      const content = entry.content?.$t || entry.summary?.$t || '';
      // Extract post ID from the in-reply-to link
      const inReplyTo = entry['thr$in-reply-to'];
      const postRef = inReplyTo?.ref || '';
      const postIdMatch = postRef.match(/post-(\d+)/);
      const postId = postIdMatch ? postIdMatch[1] : '';

      const authorName = entry.author?.[0]?.name?.$t || 'Anonymous';
      const avatarUrl =
        entry.author?.[0]?.gd$image?.src || 'https://img1.blogblog.com/img/b16-rounded.gif';

      return {
        author: authorName,
        avatarUrl,
        content,
        date: entry.published.$t.split('T')[0],
        postId,
      } as BlogComment;
    })
    .filter(c => !isSpam(c.content, c.author) && !isRemovedComment(c.content));
}

// ─── Download images ─────────────────────────────────────────────────────────

async function downloadImage(url: string, slug: string, index: number): Promise<string | null> {
  try {
    const ext = url.match(/\.(jpg|jpeg|png|gif|webp|bmp)/i)?.[1] || 'jpg';
    const filename = `${slug}-${index + 1}.${ext}`;
    const dir = path.join(IMAGES_DIR, slug);
    const filepath = path.join(dir, filename);

    await fs.mkdir(dir, { recursive: true });

    // Check for higher-res version (remove /s72-c/ or /sNNN/ size constraints)
    let highResUrl = url
      .replace(/\/s\d+-c\//, '/s1600/')
      .replace(/\/s\d+\//, '/s1600/')
      .replace(/=s\d+-c/, '=s1600')
      .replace(/=s\d+/, '=s1600');

    const res = await fetch(highResUrl);
    if (!res.ok) {
      // Fallback to original URL
      const res2 = await fetch(url);
      if (!res2.ok) return null;
      const buf = Buffer.from(await res2.arrayBuffer());
      await fs.writeFile(filepath, buf);
    } else {
      const buf = Buffer.from(await res.arrayBuffer());
      await fs.writeFile(filepath, buf);
    }

    return `/images/archive/${slug}/${filename}`;
  } catch (err) {
    console.error(`  Failed to download image: ${url}`, err);
    return null;
  }
}

// ─── HTML → MDX conversion ──────────────────────────────────────────────────

function htmlToMdx(html: string, slug: string, imageMap: Map<string, string>): string {
  let mdx = html;

  // Replace images with local paths
  for (const [originalUrl, localPath] of imageMap) {
    mdx = mdx.replace(new RegExp(escapeRegex(originalUrl), 'g'), localPath);
  }

  // Remove wrapping divs and spans with style attributes
  mdx = mdx.replace(/<div[^>]*>/gi, '\n');
  mdx = mdx.replace(/<\/div>/gi, '\n');
  mdx = mdx.replace(/<span[^>]*>/gi, '');
  mdx = mdx.replace(/<\/span>/gi, '');

  // Convert block elements
  mdx = mdx.replace(/<br\s*\/?>/gi, '\n');
  mdx = mdx.replace(/<p[^>]*>/gi, '\n');
  mdx = mdx.replace(/<\/p>/gi, '\n');
  mdx = mdx.replace(/<blockquote[^>]*>/gi, '\n> ');
  mdx = mdx.replace(/<\/blockquote>/gi, '\n');

  // Convert headings
  mdx = mdx.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n');
  mdx = mdx.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n');
  mdx = mdx.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n');

  // Convert formatting
  mdx = mdx.replace(/<(b|strong)[^>]*>(.*?)<\/(b|strong)>/gi, '**$2**');
  mdx = mdx.replace(/<(i|em)[^>]*>(.*?)<\/(i|em)>/gi, '*$2*');
  mdx = mdx.replace(/<u[^>]*>(.*?)<\/u>/gi, '$1');
  mdx = mdx.replace(/<strike[^>]*>(.*?)<\/strike>/gi, '~~$1~~');

  // Convert links
  mdx = mdx.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

  // Convert images (handle both img inside a tags and standalone)
  mdx = mdx.replace(
    /<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi,
    '![$2]($1)'
  );
  mdx = mdx.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)');

  // Convert lists
  mdx = mdx.replace(/<ul[^>]*>/gi, '\n');
  mdx = mdx.replace(/<\/ul>/gi, '\n');
  mdx = mdx.replace(/<ol[^>]*>/gi, '\n');
  mdx = mdx.replace(/<\/ol>/gi, '\n');
  mdx = mdx.replace(/<li[^>]*>/gi, '- ');
  mdx = mdx.replace(/<\/li>/gi, '\n');

  // Remove remaining HTML tags
  mdx = mdx.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  mdx = mdx.replace(/&amp;/g, '&');
  mdx = mdx.replace(/&quot;/g, '"');
  mdx = mdx.replace(/&#39;/g, "'");
  mdx = mdx.replace(/&nbsp;/g, ' ');
  mdx = mdx.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)));
  // Keep &lt; and &gt; as entities — raw < > in MDX body text breaks the parser
  mdx = mdx.replace(/&lt;/g, '\\<');
  mdx = mdx.replace(/&gt;/g, '\\>');

  // Escape any remaining bare < that could break MDX (from truncated HTML, etc.)
  mdx = mdx.replace(/</g, '\\<');

  // Clean up whitespace
  mdx = mdx.replace(/\n{3,}/g, '\n\n');
  mdx = mdx.trim();

  return mdx;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ─── Extract image URLs from HTML ────────────────────────────────────────────

function extractImageUrls(html: string): string[] {
  const urls: string[] = [];
  const imgRegex = /src="(https?:\/\/[^"]*\.(jpg|jpeg|png|gif|webp|bmp)[^"]*)"/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    urls.push(match[1]);
  }
  // Also check for images in href (blogspot wraps imgs in links to full-size)
  const hrefRegex = /href="(https?:\/\/[^"]*\.(jpg|jpeg|png|gif|webp|bmp)[^"]*)"/gi;
  while ((match = hrefRegex.exec(html)) !== null) {
    if (!urls.includes(match[1])) {
      urls.push(match[1]);
    }
  }
  return urls;
}

// ─── Build comments section ──────────────────────────────────────────────────

function buildCommentsSection(comments: BlogComment[]): string {
  if (comments.length === 0) return '';

  const sorted = [...comments].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let section = '\n\n---\n\n## Comments\n\n';
  for (const c of sorted) {
    // Clean comment HTML
    let text = c.content
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .trim();

    const isDefaultAvatar =
      c.avatarUrl.includes('b16-rounded.gif') || c.avatarUrl.includes('blank.gif');
    const avatarSrc = isDefaultAvatar
      ? '/images/archive/default-avatar.svg'
      : c.avatarUrl;

    section += `<div className="flex gap-3 mb-6">\n`;
    section += `  <img src="${avatarSrc}" alt="${c.author}" className="w-8 h-8 rounded-full mt-1 shrink-0" />\n`;
    section += `  <div>\n`;
    section += `    <div className="flex items-baseline gap-2">\n`;
    section += `      <span className="font-medium text-sm">${c.author}</span>\n`;
    section += `      <span className="text-xs text-zinc-400">${c.date}</span>\n`;
    section += `    </div>\n`;
    // Replace newlines with spaces and escape characters that break MDX JSX
    const inlineText = text
      .replace(/\n+/g, ' ')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\{/g, '&#123;')
      .replace(/\}/g, '&#125;')
      .trim();
    section += `    <p className="text-sm text-zinc-600 mt-1">${inlineText}</p>\n`;
    section += `  </div>\n`;
    section += `</div>\n\n`;
  }

  return section;
}

// ─── Generate MDX file ───────────────────────────────────────────────────────

function generateMdx(post: BlogPost, imageMap: Map<string, string>): string {
  const escapedTitle = post.title.replace(/"/g, '\\"');
  const description = post.content
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);

  const tags = post.tags
    .map(t => t.toLowerCase().replace(/\s+/g, '-'))
    .map(t => `  - ${t}`)
    .join('\n');

  let mdx = `---\ntitle: "${escapedTitle}"\ndate: ${post.date}\ndescription: "${description.replace(/"/g, '\\"')}"\ntags:\n${tags || '  - archive'}\noriginalUrl: "${post.url}"\n---\n\n`;

  mdx += htmlToMdx(post.content, post.slug, imageMap);
  mdx += buildCommentsSection(post.comments);

  return mdx;
}

// ─── Fetch full post content from HTML page ─────────────────────────────────

async function fetchFullContent(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const html = await res.text();

    // Extract post body - old Blogspot templates use class='itemtext'
    const itemTextMatch = html.match(
      /<div class=['"]itemtext['"][^>]*>([\s\S]*?)<\/div>\s*<div class=['"]itemhead['"]/i
    );
    if (itemTextMatch) return itemTextMatch[1].trim();

    // Modern Blogspot uses class="post-body entry-content"
    const bodyMatch = html.match(
      /<div class=['"]post-body entry-content[^'"]*['"][^>]*>([\s\S]*?)<\/div>\s*<div/i
    );
    if (bodyMatch) return bodyMatch[1].trim();

    return null;
  } catch {
    return null;
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Starting Blogspot → MDX migration\n');

  // Create directories
  await fs.mkdir(ARCHIVE_DIR, { recursive: true });
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  // Create default avatar SVG
  const defaultAvatar = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <circle cx="16" cy="16" r="16" fill="#e4e4e7"/>
  <circle cx="16" cy="12" r="5" fill="#a1a1aa"/>
  <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" fill="#a1a1aa"/>
</svg>`;
  await fs.writeFile(path.join(IMAGES_DIR, 'default-avatar.svg'), defaultAvatar);

  // Step 1: Fetch all posts
  console.log('📥 Fetching posts...');
  const postEntries = await fetchAllPages(POSTS_FEED, 'posts');
  const posts = parsePosts(postEntries);
  console.log(`  Found ${posts.length} posts\n`);

  // Step 2: Fetch all comments
  console.log('💬 Fetching comments...');
  const commentEntries = await fetchAllPages(COMMENTS_FEED, 'comments');
  const comments = parseComments(commentEntries);
  console.log(`  Found ${comments.length} non-spam comments\n`);

  // Step 3: Map comments to posts
  const commentsByPost = new Map<string, BlogComment[]>();
  for (const comment of comments) {
    const existing = commentsByPost.get(comment.postId) || [];
    existing.push(comment);
    commentsByPost.set(comment.postId, existing);
  }

  for (const post of posts) {
    post.comments = commentsByPost.get(post.id) || [];
  }

  // Step 4: Process each post
  console.log('📝 Processing posts...\n');

  // Track slugs to avoid duplicates
  const usedSlugs = new Set<string>();

  for (const post of posts) {
    // Ensure unique slug
    let slug = post.slug;
    if (usedSlugs.has(slug)) {
      slug = `${slug}-${post.date}`;
    }
    usedSlugs.add(slug);
    post.slug = slug;

    console.log(`  [${post.date}] ${post.title}`);

    // Fetch full content from the actual blog page if URL exists
    if (post.url) {
      const fullContent = await fetchFullContent(post.url);
      if (fullContent) {
        post.content = fullContent;
      }
      // Small delay to be respectful
      await new Promise(r => setTimeout(r, 200));
    }

    // Download images
    const imageUrls = extractImageUrls(post.content);
    const imageMap = new Map<string, string>();

    if (imageUrls.length > 0) {
      console.log(`    📷 Downloading ${imageUrls.length} images...`);
      for (let i = 0; i < imageUrls.length; i++) {
        const localPath = await downloadImage(imageUrls[i], post.slug, i);
        if (localPath) {
          imageMap.set(imageUrls[i], localPath);
        }
      }
    }

    if (post.comments.length > 0) {
      console.log(`    💬 ${post.comments.length} comments`);
    }

    // Generate and write MDX
    const mdx = generateMdx(post, imageMap);
    await fs.writeFile(path.join(ARCHIVE_DIR, `${post.slug}.mdx`), mdx);
  }

  console.log(`\n✅ Migration complete! ${posts.length} posts written to content/archive/`);
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
