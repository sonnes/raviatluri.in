import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import avatarImage from '@/public/images/avatar.jpg';

type Props = {
  large?: boolean;
  className?: string;
  [key: string]: string | boolean | undefined;
};

export default function Avatar({ large = false, className, ...props }: Props) {
  return (
    <Link href="/" aria-label="Home" className={clsx(className, 'pointer-events-auto')} {...props}>
      <Image
        src={avatarImage}
        alt=""
        sizes={large ? '4rem' : '2.25rem'}
        className={clsx(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          large ? 'h-16 w-16' : 'h-9 w-9'
        )}
        priority
      />
    </Link>
  );
}
