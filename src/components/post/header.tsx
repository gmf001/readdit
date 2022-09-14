import Image from 'next/image';
import { format } from 'timeago.js';
import type { RedditPost } from '@/api/reddit/types';
import redditIcon from '/public/images/reddit-icon.png';

export const PostHeader = (post: RedditPost) => {
  return (
    <div className='mb-4 flex flex-1 flex-col space-y-3'>
      <div className='flex items-center space-x-3 truncate'>
        <div className='relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-white md:h-10 md:w-10'>
          <Image
            src={
              post.sr_detail?.community_icon ||
              post.sr_detail?.icon_img ||
              redditIcon
            }
            alt={post.sr_detail?.title}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='text-xs font-semibold text-gray-500'>
          (r/{post?.subreddit})
        </div>
      </div>

      <a
        href={`https://reddit.com${post.permalink}`}
        target='_blank'
        rel='noreferrer'
      >
        <h2 className='text-xl font-bold text-white transition-colors duration-150 ease-in line-clamp-2 group-hover:text-indigo-300'>
          {post.title}
        </h2>
      </a>
      <p className='text-xs font-semibold text-gray-400'>
        {format(new Date(post.created * 1000))} &#183; u/
        {post.author}
      </p>
      {post.post_hint === 'link' && (
        <div className='block overflow-hidden truncate rounded bg-indigo-900/20 p-2 text-xs text-indigo-200 transition-colors duration-200 ease-in hover:bg-indigo-800/20 hover:text-indigo-100'>
          <a
            className='truncate'
            href={post.url}
            target='_blank'
            rel='noreferrer'
          >
            {post.url}
          </a>
        </div>
      )}
    </div>
  );
};
