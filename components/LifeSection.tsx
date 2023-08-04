import { ReactNode } from 'react';
import clsx from 'clsx';

export const Tooltip = ({
  message,
  className,
  children,
}: {
  message: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={clsx('group relative', className)}>
      {children}
      <span className="absolute w-max bottom-8 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white break-keep group-hover:scale-100">
        {message}
      </span>
    </div>
  );
};

export const Header = ({ age }: { age: number }) => {
  return (
    <>
      <br className="clear-both" />
      <div className="row text-left display-block w-100">
        <div className="col sticky-top mt-1">
          <h2 className="my-2 text-xl font-bold">
            <>
              {age === 0 && 'The first ten years'}
              {age === 10 && 'The teens'}
              {age === 100 && 'Endgame'}
              {age !== 0 && age !== 10 && age !== 100 && `The ${age}s`}
            </>
          </h2>
        </div>
      </div>
    </>
  );
};