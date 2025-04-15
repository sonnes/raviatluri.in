import { Container } from '@/components/container';

import { AbacusProvider } from './context';
import { DictationList } from './dictation';
import UploadForm from './upload';

export const metadata = {
  title: 'Abacus Dictation',
  description: 'Dictation tool for Abacus. Reads out problems for abacus practice.',
};

export default async function Abacus({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { password } = await searchParams;

  if (!password || password !== process.env.ABACUS_PASSWORD) {
    return (
      <Container className="mt-8 sm:mt-16">
        <header className="max-w-3xl pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-red-600">Access Denied</h1>
          <p className="mt-6 text-lg text-red-600">
            Please provide the correct password in the URL parameter to access this page.
          </p>
        </header>
      </Container>
    );
  }

  return (
    <Container className="mt-8 sm:mt-16">
      <header className="max-w-3xl pb-10">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800">{metadata.title}</h1>
        <p className="mt-6 text-lg text-zinc-600">{metadata.description}</p>
      </header>
      <div className="space-y-20">
        <AbacusProvider>
          <UploadForm />
          <DictationList />
        </AbacusProvider>
      </div>
    </Container>
  );
}
