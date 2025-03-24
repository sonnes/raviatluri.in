import Image from 'next/image';

import { Container } from '@/components/container';
import photos from '@/content/photos';

export const metadata = {
  title: 'Photos',
  description: 'Landscapes, portraits, and more taken over the years.',
};

export default function Photos() {
  return (
    <>
      <Container className="mt-8 sm:mt-16">
        <header className="max-w-3xl pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800">{metadata.title}</h1>
          <p className="mt-6 text-lg text-zinc-600">{metadata.description}</p>
        </header>
        <ul role="list" className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          {photos.map((image, imageIndex) => (
            <div
              key={imageIndex}
              className="relative aspect-[16/9] flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl"
            >
              <Image
                src={image.src}
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 text-white text-left pl-4 py-2">
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </ul>
      </Container>
    </>
  );
}
