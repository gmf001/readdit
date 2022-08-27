import { SORTS } from '@/api/reddit';
import { trpc } from '@/utils/trpc';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { useState } from 'react';

type Props = {
  query: SORTS;
  setQuery: (q: SORTS) => void;
  subreddit: string | undefined;
  setSubreddit: (s: string) => void;
};

function Tags({ query, setQuery, setSubreddit, subreddit }: Props) {
  const [translateXValue, setTranslateXValue] = useState(0);
  const { data } = trpc.useQuery(['reddit.mySubreddits']);
  const translateStyles = { transform: `translateX(${translateXValue}px)` };

  return (
    <div className='flex items-center space-x-5 divide-x divide-dark-400 py-8'>
      <div className='flex items-center space-x-4'>
        <div
          onClick={() => setQuery('best')}
          className={`flex cursor-pointer items-center justify-center rounded-xl bg-dark-400 p-3 px-5 text-sm font-bold hover:bg-primary-300/10 hover:text-primary-400 ${
            query === 'best' && 'bg-primary-300/10 text-primary-400'
          }`}
        >
          Best
        </div>
        <div
          onClick={() => setQuery('hot')}
          className={`flex cursor-pointer items-center justify-center rounded-xl bg-dark-400 p-3 px-5 text-sm font-bold hover:bg-primary-300/10 hover:text-primary-400 ${
            query === 'hot' && 'bg-primary-300/10 text-primary-400'
          }`}
        >
          Hot
        </div>
        <div
          onClick={() => setQuery('new')}
          className={`flex cursor-pointer items-center justify-center rounded-xl bg-dark-400 p-3 px-5 text-sm font-bold hover:bg-primary-300/10 hover:text-primary-400 ${
            query === 'new' && 'bg-primary-300/10 text-primary-400'
          }`}
        >
          New
        </div>
        <div
          onClick={() => setQuery('top')}
          className={`flex cursor-pointer items-center justify-center rounded-xl bg-dark-400 p-3 px-5 text-sm font-bold hover:bg-primary-300/10 hover:text-primary-400 ${
            query === 'top' && 'bg-primary-300/10 text-primary-400'
          }`}
        >
          Top
        </div>
      </div>

      <div className='relative overflow-x-hidden pl-6'>
        <div className='mr-14 overflow-x-scroll scrollbar-hide'>
          <div
            className='flex items-center space-x-4 transition-transform duration-200 ease-linear'
            style={translateStyles}
          >
            {data?.map((s) => (
              <div
                key={s.id}
                onClick={() => setSubreddit(s.display_name_prefixed)}
                className={`min-w-min cursor-pointer truncate rounded-xl bg-dark-400 p-3 px-5 text-center text-sm font-bold hover:bg-primary-300/10 hover:text-primary-400 ${
                  subreddit === s.display_name_prefixed &&
                  'bg-primary-300/10 text-primary-400'
                }`}
              >
                {s.display_name_prefixed}
              </div>
            ))}
          </div>
        </div>
        <div className='absolute top-0 right-0 z-10 h-full w-auto bg-gradient-to-r from-transparent to-dark-500'>
          <button
            onClick={() => setTranslateXValue(translateXValue - 200)}
            className='absolute right-0 top-1/2 z-10 flex h-full w-11 -translate-y-1/2 items-center justify-center rounded-xl bg-dark-300 font-bold hover:bg-primary-300/10 hover:text-primary-400'
          >
            <ChevronRightIcon className='h-5 w-5 font-bold' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tags;
