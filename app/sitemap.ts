import { getAllArticles } from '@/content/articles';

export default async function sitemap() {
  const articles = await getAllArticles();

  const notes = articles.map(article => ({
    url: `https://raviatluri.in/articles/${article.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ['', '/articles', '/about', '/projects', '/tools'].map(route => ({
    url: `https://raviatluri.in${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...notes];
}
