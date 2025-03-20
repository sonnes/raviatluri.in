import Image from 'next/image';

import photos from '@/content/photos';

export default function Photos() {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-2">
        {photos.slice(0, 6).map((image, imageIndex) => (
          <div key={imageIndex} className="relative aspect-square overflow-hidden rounded-md">
            <Image
              src={image.src}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
