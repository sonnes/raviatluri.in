import fs from 'fs';
import path from 'path';
import { create } from 'xmlbuilder2';

function generateSitemap(): string {
  const xml = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

  const contentDir = path.join(process.cwd(), 'content');

  function traverseDirectory(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        traverseDirectory(filePath);
      } else {
        // Logic to collect information about static pages, articles, and snippets
        const fileExtension = path.extname(filePath);
        const fileName = path.basename(filePath, fileExtension);
        const fileUrl = filePath.replace(contentDir, '').replace(fileExtension, '');

        if (fileUrl.startsWith('/static')) {
          // Logic for static pages
          xml.ele('url').ele('loc').txt(fileUrl).up().up();
        } else if (fileUrl.startsWith('/articles')) {
          // Logic for articles
          xml.ele('url').ele('loc').txt(fileUrl).up().up();
        } else if (fileUrl.startsWith('/snippets')) {
          // Logic for snippets
          xml.ele('url').ele('loc').txt(fileUrl).up().up();
        }
      }
    }
  }

  traverseDirectory(contentDir);

  return xml.end({ prettyPrint: true });
}

export default generateSitemap;

