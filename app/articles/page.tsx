import ArticleCard from '@/components/article';
import { Container } from '@/components/container';
import { getAllArticles } from '@/content/articles';

export const metadata = {
  title: 'Articles',
  description:
    'All of my thoughts on building products, Golang, system design, accessibility, ALS and more',
};

export default async function ArticlesIndex() {
  const articles = await getAllArticles();

  return (
    <Container className="mt-8 sm:mt-16">
      <header className="max-w-3xl mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          {metadata.title}
        </h1>
        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">{metadata.description}</p>
      </header>
      <div className="flex max-w-3xl flex-col space-y-16 border-l border-zinc-200 pl-6">
        {articles.map(article => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </Container>
  );
}
