import clsx from 'clsx';
import { PropsWithChildren, useState } from 'react';
import type { RedditPost } from '@/api/reddit/types';

export const NSFW = ({ children, ...post }: PropsWithChildren<RedditPost>) => {
  const [show, setShow] = useState(post.over_18);

  return (
    <div className='relative flex h-full w-full'>
      {show && (
        <div className='z-10 h-full w-full bg-black/60'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <button
              onClick={() => setShow(false)}
              className='rounded-sm border-2 border-red-500 bg-red-500/20 px-6 py-2 font-bold text-red-500 transition duration-200 ease-in hover:border-red-400 hover:text-red-400'
            >
              NSFW
            </button>
          </div>
        </div>
      )}
      <div className={clsx('absolute h-full w-full', show && 'blur')}>
        {children}
      </div>
    </div>
  );
};
