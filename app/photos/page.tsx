import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/container';
import photos from '@/content/photos';

export const metadata = {
  title: 'Photos',
  description: 'Moments I stopped to capture.',
};

function getTimeline(photosData: typeof photos) {
  const timeline: { year: string; months: { month: string; label: string }[] }[] = [];
  const seen = new Set<string>();

  for (const photo of photosData) {
    if (!photo.date) continue;
    const dt = new Date(photo.date);
    const year = dt.getFullYear().toString();
    const month = `${year}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
    const monthLabel = dt.toLocaleDateString('en-US', { month: 'short' });

    if (!seen.has(month)) {
      seen.add(month);
      let yearEntry = timeline.find(t => t.year === year);
      if (!yearEntry) {
        yearEntry = { year, months: [] };
        timeline.push(yearEntry);
      }
      yearEntry.months.push({ month, label: monthLabel });
    }
  }

  return timeline;
}

function getTagCounts(photosData: typeof photos) {
  const counts = new Map<string, number>();
  for (const photo of photosData) {
    if (!photo.tags) continue;
    for (const tag of photo.tags) {
      const normalized = tag.toLowerCase();
      counts.set(normalized, (counts.get(normalized) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}

type Props = {
  searchParams: Promise<{ tag?: string; month?: string }>;
};

function buildQuery(params: Record<string, string | undefined>) {
  const entries = Object.entries(params).filter(([, v]) => v);
  if (entries.length === 0) return '/photos';
  const qs = new URLSearchParams(entries as [string, string][]).toString();
  return `/photos?${qs}`;
}

export default async function Photos({ searchParams }: Props) {
  const { tag: activeTag, month: activeMonth } = await searchParams;
  const normalizedTag = activeTag?.toLowerCase();

  const filteredPhotos = photos.filter(p => {
    if (normalizedTag && !p.tags?.some(t => t.toLowerCase() === normalizedTag)) {
      return false;
    }
    if (activeMonth && p.date) {
      const dt = new Date(p.date);
      const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
      if (key !== activeMonth) return false;
    } else if (activeMonth && !p.date) {
      return false;
    }
    return true;
  });

  // Timeline always shows full range
  const timeline = getTimeline(photos);
  const tagCounts = getTagCounts(photos);
  const maxCount = tagCounts[0]?.count || 1;

  const photosByMonth: Record<string, number> = {};
  for (let i = 0; i < filteredPhotos.length; i++) {
    const photo = filteredPhotos[i];
    if (!photo.date) continue;
    const dt = new Date(photo.date);
    const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
    if (!(key in photosByMonth)) {
      photosByMonth[key] = i;
    }
  }

  return (
    <Container className="mt-8 sm:mt-14">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Photos</h1>
        <p className="mt-6 text-base text-text-secondary">
          {activeTag || activeMonth ? (
            <>
              Showing {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''}
              {activeTag && (
                <>
                  {' '}tagged{' '}
                  <span className="font-semibold text-text-primary">#{activeTag}</span>
                </>
              )}
              {activeMonth && (
                <>
                  {' '}from{' '}
                  <span className="font-semibold text-text-primary">
                    {new Date(activeMonth + '-01').toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </>
              )}
              .{' '}
              <Link href="/photos" className="text-primary hover:underline">
                Clear filter
              </Link>
            </>
          ) : (
            'Moments I stopped to capture.'
          )}
        </p>
      </header>

      {/* Mobile filter chips - horizontal scrolling */}
      <div className="mt-8 lg:hidden -mx-4 sm:-mx-8">
        {/* Month chips */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 px-4 sm:px-8 pb-2 whitespace-nowrap">
            {timeline.flatMap(yearEntry =>
              yearEntry.months.map(m => {
                const isActive = activeMonth === m.month;
                return (
                  <Link
                    key={m.month}
                    href={
                      isActive
                        ? buildQuery({ tag: activeTag })
                        : buildQuery({ tag: activeTag, month: m.month })
                    }
                    className={
                      isActive
                        ? 'text-xs font-semibold px-3 py-1.5 rounded-full bg-primary text-white whitespace-nowrap'
                        : 'text-xs font-medium px-3 py-1.5 rounded-full bg-surface-50 text-text-secondary hover:bg-surface-100 whitespace-nowrap'
                    }
                  >
                    {m.label} {yearEntry.year}
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Tag chips */}
        {tagCounts.length > 0 && (
          <div className="overflow-x-auto scrollbar-hide mt-2">
            <div className="flex gap-2 px-4 sm:px-8 pb-2 whitespace-nowrap">
              {tagCounts.map(({ tag }) => {
                const isActive = tag === normalizedTag;
                return (
                  <Link
                    key={tag}
                    href={
                      isActive
                        ? buildQuery({ month: activeMonth })
                        : buildQuery({ tag, month: activeMonth })
                    }
                    className={
                      isActive
                        ? 'text-xs font-semibold px-3 py-1.5 rounded-full bg-primary text-white whitespace-nowrap'
                        : 'text-xs font-medium px-3 py-1.5 rounded-full bg-surface-50 text-text-secondary hover:bg-surface-100 whitespace-nowrap'
                    }
                  >
                    #{tag}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 lg:mt-20 lg:grid lg:grid-cols-[80px_1fr] lg:gap-6 max-w-3xl mx-auto">
        {/* Timeline navigation - desktop only */}
        <nav className="hidden lg:block">
          <div className="sticky top-32 flex flex-col gap-1">
            {timeline.map(yearEntry => (
              <div key={yearEntry.year} className="flex flex-col">
                <a
                  href={`#month-${yearEntry.months[0].month}`}
                  className="text-xs font-semibold text-text-primary hover:text-primary transition-colors py-1"
                >
                  {yearEntry.year}
                </a>
                {yearEntry.months.map(m => {
                  const isActive = activeMonth === m.month;
                  return (
                    <Link
                      key={m.month}
                      href={
                        isActive
                          ? buildQuery({ tag: activeTag })
                          : buildQuery({ tag: activeTag, month: m.month })
                      }
                      className={
                        isActive
                          ? 'text-xs text-primary font-semibold transition-colors py-0.5 pl-2'
                          : 'text-xs text-text-muted hover:text-primary transition-colors py-0.5 pl-2'
                      }
                    >
                      {m.label}
                    </Link>
                  );
                })}
              </div>
            ))}

            {tagCounts.length > 0 && (
              <div className="mt-8 pt-4 border-t border-border">
                <div className="text-xs font-semibold text-text-primary mb-2">Tags</div>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  {tagCounts.map(({ tag, count }) => {
                    const isActive = tag === normalizedTag;
                    return (
                      <Link
                        key={tag}
                        href={
                          isActive
                            ? buildQuery({ month: activeMonth })
                            : buildQuery({ tag, month: activeMonth })
                        }
                        className={
                          isActive
                            ? 'text-primary font-semibold transition-colors'
                            : 'text-text-muted hover:text-primary transition-colors'
                        }
                        style={{
                          fontSize: `${Math.max(10, 10 + (count / maxCount) * 4)}px`,
                          opacity: isActive ? 1 : Math.max(0.5, 0.5 + (count / maxCount) * 0.5),
                        }}
                        title={`${count} photo${count > 1 ? 's' : ''}`}
                      >
                        #{tag}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Photo feed */}
        <div className="max-w-2xl">
          <div className="space-y-16">
            {filteredPhotos.map((photo, index) => {
              let monthAnchor: string | null = null;
              if (photo.date) {
                const dt = new Date(photo.date);
                const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
                if (photosByMonth[key] === index) {
                  monthAnchor = key;
                }
              }

              return (
                <article key={index} id={monthAnchor ? `month-${monthAnchor}` : undefined}>
                  {monthAnchor && (
                    <div className="mb-6 text-sm font-semibold text-secondary">
                      {new Date(photo.date!).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  )}
                  <div className="relative overflow-hidden rounded-lg bg-surface-50 aspect-square">
                    <Image
                      src={photo.src}
                      alt={photo.caption || `Photo ${index + 1}`}
                      sizes="(min-width: 768px) 42rem, 100vw"
                      className="absolute inset-0 h-full w-full object-cover"
                      priority={index < 2}
                    />
                  </div>
                  {(photo.caption || photo.date || photo.location || photo.tags?.length) && (
                    <div className="mt-4">
                      {photo.caption && (
                        <p className="text-sm text-text-primary leading-relaxed">{photo.caption}</p>
                      )}
                      <div className="mt-1 flex items-center gap-2 text-xs text-secondary">
                        {photo.location && <span>{photo.location}</span>}
                        {photo.location && photo.date && <span aria-hidden="true">·</span>}
                        {photo.date && (
                          <time dateTime={photo.date}>
                            {new Date(photo.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </time>
                        )}
                      </div>
                      {photo.tags && photo.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {photo.tags.map(t => (
                            <Link
                              key={t}
                              href={buildQuery({ tag: t.toLowerCase(), month: activeMonth })}
                              className="text-xs text-text-muted hover:text-primary transition-colors"
                            >
                              #{t}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
