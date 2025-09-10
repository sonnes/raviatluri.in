import Image from 'next/image';

import { Container } from '@/components/container';
import photos from '@/content/photos';

export const metadata = {
  title: 'Photos',
  description:
    'A curated collection of landscapes, portraits, and moments captured during my travels and daily life.',
};

export default function Photos() {
  return (
    <>
      <Container className="mt-8 sm:mt-16">
        <header className="max-w-3xl pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800">{metadata.title}</h1>
          <p className="mt-6 text-lg text-zinc-600">{metadata.description}</p>
        </header>

        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-16 w-16 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
              <svg
                className="h-8 w-8 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-zinc-800 mb-2">No photos yet</h2>
            <p className="text-sm text-zinc-500 max-w-md">
              Photos will be added soon. Check back later to see landscapes, portraits, and other
              captures from my adventures.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((image, imageIndex) => (
              <div
                key={imageIndex}
                className="group relative aspect-[4/3] flex-none overflow-hidden rounded-xl bg-zinc-100 transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={image.src}
                  alt={image.caption || `Photo ${imageIndex + 1} from Ravi Atluri's collection`}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                  priority={imageIndex < 6}
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                    <p className="text-sm text-white font-medium">{image.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
