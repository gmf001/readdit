import { SORTS } from '@/api/reddit';
import { trpc } from '@/utils/trpc';

type Props = {
  query: SORTS;
  setQuery: (q: SORTS) => void;
  subreddit: string | undefined;
  setSubreddit: (s: string) => void;
};

function Tags({ query, setQuery, setSubreddit, subreddit }: Props) {
  const { data } = trpc.useQuery(['reddit.mySubreddits']);

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

      <div className='flex items-center space-x-4 pl-6'>
        {data?.map((s) => (
          <div
            key={s.id}
            onClick={() => setSubreddit(s.display_name_prefixed)}
            className={`flex cursor-pointer items-center justify-center truncate rounded-xl bg-dark-400 p-3 px-5 text-center text-sm font-bold hover:bg-primary-300/10 hover:text-primary-400 ${
              subreddit === s.display_name_prefixed &&
              'bg-primary-300/10 text-primary-400'
            }`}
          >
            {s.display_name_prefixed}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tags;
