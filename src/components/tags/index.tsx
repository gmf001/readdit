import type { SortBy } from '@/api/reddit/types';

type Props = {
  query: SortBy;
  setQuery: (q: SortBy) => void;
};

export const Tags = ({ query, setQuery }: Props) => {
  return (
    <div className='divide-dark-400 hidden items-center space-x-5 divide-x py-4 sm:inline-flex md:py-8'>
      <div className='flex items-center space-x-4'>
        <div
          onClick={() => setQuery('best')}
          className={`flex cursor-pointer items-center justify-center rounded-md bg-dark-accent-1 p-3 px-5 text-sm font-bold hover:bg-indigo-400/20 hover:text-indigo-400 ${
            query === 'best' && 'bg-indigo-400/20 text-indigo-400'
          }`}
        >
          Best
        </div>
        <div
          onClick={() => setQuery('hot')}
          className={`flex cursor-pointer items-center justify-center rounded-md bg-dark-accent-1 p-3 px-5 text-sm font-bold hover:bg-indigo-400/20 hover:text-indigo-400 ${
            query === 'hot' && 'bg-indigo-400/20 text-indigo-400'
          }`}
        >
          Hot
        </div>
        <div
          onClick={() => setQuery('new')}
          className={`flex cursor-pointer items-center justify-center rounded-md bg-dark-accent-1 p-3 px-5 text-sm font-bold hover:bg-indigo-400/20 hover:text-indigo-400 ${
            query === 'new' && 'bg-indigo-400/20 text-indigo-400'
          }`}
        >
          New
        </div>
        <div
          onClick={() => setQuery('top')}
          className={`flex cursor-pointer items-center justify-center rounded-md bg-dark-accent-1 p-3 px-5 text-sm font-bold hover:bg-indigo-400/20 hover:text-indigo-400 ${
            query === 'top' && 'bg-indigo-400/20 text-indigo-400'
          }`}
        >
          Top
        </div>
      </div>
    </div>
  );
};
