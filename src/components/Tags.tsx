import { SORT_BY } from '@/api/reddit';
import { trpc } from '@/utils/trpc';

type Props = {
  query: SORT_BY;
  setQuery: (q: SORT_BY) => void;
};

function Tags({ query, setQuery }: Props) {
  const { data, isLoading } = trpc.useQuery(['reddit.mySubreddits']);

  console.log('tags', data);

  const updateQuery = async (q: SORT_BY) => {
    setQuery(q);
  };

  return (
    <div className='flex items-center space-x-5 divide-x divide-dark-400 py-8'>
      <div className='flex items-center space-x-4'>
        <div
          onClick={() => updateQuery('best')}
          className={`flex cursor-pointer items-center justify-center rounded-xl bg-dark-400 p-3 px-5 text-sm font-bold hover:bg-primary-300/10 hover:text-primary-400 ${
            query === 'best' && 'bg-primary-300/10 text-primary-400'
          }`}
        >
          Best
        </div>
        <div
          onClick={() => updateQuery('hot')}
          className={`flex cursor-pointer items-center justify-center rounded-xl bg-dark-400 p-3 px-5 text-sm font-bold hover:bg-primary-300/10 hover:text-primary-400 ${
            query === 'hot' && 'bg-primary-300/10 text-primary-400'
          }`}
        >
          Hot
        </div>
        <div
          onClick={() => updateQuery('new')}
          className={`flex cursor-pointer items-center justify-center rounded-xl bg-dark-400 p-3 px-5 text-sm font-bold hover:bg-primary-300/10 hover:text-primary-400 ${
            query === 'new' && 'bg-primary-300/10 text-primary-400'
          }`}
        >
          New
        </div>
        <div
          onClick={() => updateQuery('top')}
          className={`flex cursor-pointer items-center justify-center rounded-xl bg-dark-400 p-3 px-5 text-sm font-bold hover:bg-primary-300/10 hover:text-primary-400 ${
            query === 'top' && 'bg-primary-300/10 text-primary-400'
          }`}
        >
          Top
        </div>
      </div>

      <div className='flex items-center space-x-4 pl-6'>
        {data?.map((subreddit) => (
          <div
            key={subreddit.id}
            onClick={() => updateQuery('best')}
            className={`flex cursor-pointer items-center justify-center truncate rounded-xl bg-dark-400 p-3 px-5 text-center text-sm font-bold hover:bg-primary-300/10 hover:text-primary-400 ${
              query === 'best' && 'bg-primary-300/10 text-primary-400'
            }`}
          >
            {subreddit.display_name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tags;
