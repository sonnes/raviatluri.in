import Image from 'next/image';
import Link from 'next/link';

import photos from '@/content/photos';

export default function Photos() {
  return (
    <div className="mt-6 space-y-6">
      {photos.slice(0, 5).map((photo, imageIndex) => (
        <article key={imageIndex}>
          <Link href={`/photos?tag=${photo.tags?.[0]?.toLowerCase()}`}>
            <div className="relative aspect-square overflow-hidden rounded-lg hover:opacity-90 transition-opacity">
              <Image
                src={photo.src}
                alt={photo.caption || ''}
                sizes="(min-width: 640px) 18rem, 11rem"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Link>
          {photo.caption && (
            <p className="mt-2 text-sm text-text-primary line-clamp-2">{photo.caption}</p>
          )}
          {photo.date && (
            <time className="text-xs text-text-muted">
              {new Date(photo.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          )}
        </article>
      ))}
    </div>
  );
}
