import Image from 'next/image';

import type { Metadata } from 'next';

import { SimpleLayout } from '@/components/simple_layout';
import photos from '@/lib/photos';

export const metadata: Metadata = {
  title: 'Photos',
  description: 'Landscapes, portraits, and more taken over the years.',
};

export default function Projects() {
  return (
    <>
      <SimpleLayout
        title="Photos"
        intro="Landscapes, portraits, and more taken over the years."
      >
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
      </SimpleLayout>
    </>
  );
}
