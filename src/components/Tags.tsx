import type { SORTS } from '@/api/reddit';

type Props = {
  query: SORTS;
  setQuery: (q: SORTS) => void;
};

function Tags({ query, setQuery }: Props) {
  return (
    <div className='flex items-center space-x-5 divide-x divide-dark-400 py-8'>
      <div className='flex items-center space-x-4'>
        <div
          onClick={() => setQuery('best')}
          className={`flex cursor-pointer items-center justify-center rounded-xl bg-dark-400 p-3 px-5 text-sm font-bold hover:bg-indigo-300/10 hover:text-indigo-400 ${
            query === 'best' && 'bg-indigo-300/10 text-indigo-400'
          }`}
        >
          Best
        </div>
        <div
          onClick={() => setQuery('hot')}
          className={`flex cursor-pointer items-center justify-center rounded-xl bg-dark-400 p-3 px-5 text-sm font-bold hover:bg-indigo-300/10 hover:text-indigo-400 ${
            query === 'hot' && 'bg-indigo-300/10 text-indigo-400'
          }`}
        >
          Hot
        </div>
        <div
          onClick={() => setQuery('new')}
          className={`flex cursor-pointer items-center justify-center rounded-xl bg-dark-400 p-3 px-5 text-sm font-bold hover:bg-indigo-300/10 hover:text-indigo-400 ${
            query === 'new' && 'bg-indigo-300/10 text-indigo-400'
          }`}
        >
          New
        </div>
        <div
          onClick={() => setQuery('top')}
          className={`flex cursor-pointer items-center justify-center rounded-xl bg-dark-400 p-3 px-5 text-sm font-bold hover:bg-indigo-300/10 hover:text-indigo-400 ${
            query === 'top' && 'bg-indigo-300/10 text-indigo-400'
          }`}
        >
          Top
        </div>
      </div>
    </div>
  );
}

export default Tags;
