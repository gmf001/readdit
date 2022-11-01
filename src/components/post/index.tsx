import type { RedditPost } from '@/api/reddit/types';
import { PostImage } from './image';
import { PostFooter } from './footer';
import { PostHeader } from './header';

export const Post = (post: RedditPost) => {
  return (
    <div className='group flex flex-col justify-between space-y-1 rounded border border-dark-accent-3 bg-dark-accent-1 p-4 transition duration-100 ease-linear md:rounded-lg'>
      <PostHeader {...post} />
      <div className='relative h-[125px] w-full flex-shrink-0 overflow-hidden rounded-xl text-sm sm:h-[155px]'>
        <PostImage {...post} />
      </div>
      <PostFooter {...post} />
    </div>
  );
};
