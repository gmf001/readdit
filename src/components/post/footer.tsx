import { useState } from 'react';
import clsx from 'clsx';
import { trpc } from '@/api/trpc';
import nFormatter from '@/utils/numberFormatter';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
import type { RedditPost } from '@/api/reddit/types';
import { useSession } from 'next-auth/react';

export const PostFooter = (post: RedditPost) => {
  const { data: session } = useSession();
  const [hasLiked, setHasLiked] = useState(post.likes);

  const vote = trpc.useMutation(['reddit.vote'], {
    onSuccess(newData, variables) {
      if (newData) {
        if (variables.dir == 1) {
          setHasLiked(true);
        } else {
          setHasLiked(false);
        }
      }
    }
  });

  return (
    <div className='flex items-center justify-between pt-3'>
      <div className='flex items-center space-x-2'>
        <button
          onClick={() => vote.mutate({ id: post.name, dir: 1 })}
          disabled={!session}
          className='cursor-pointer rounded font-bold text-gray-400 hover:text-gray-200 disabled:text-gray-600'
        >
          <ArrowUpIcon
            className={clsx('h-4 w-4', hasLiked == true && '!text-orange-500')}
          />
        </button>
        <span className='text-xs font-semibold text-gray-400'>
          {nFormatter(post.ups, hasLiked)}
        </span>
        <button
          disabled={!session}
          className='cursor-pointer rounded font-bold text-gray-400 hover:text-gray-200 disabled:text-gray-600'
        >
          <ArrowDownIcon
            onClick={() => vote.mutate({ id: post.name, dir: -1 })}
            className={clsx('h-4 w-4', hasLiked == false && '!text-orange-500')}
          />
        </button>
      </div>
      <div className='flex items-center space-x-2'>
        <a
          href={'https://reddit.com/' + post.permalink}
          target='_blank'
          className='text-xs font-semibold text-gray-400 hover:text-gray-200'
          rel='noreferrer'
        >
          {nFormatter(post.num_comments)} comments
        </a>
      </div>
    </div>
  );
};
