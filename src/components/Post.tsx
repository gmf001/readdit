import Image from 'next/image';
import { inferQueryOutput } from '@/utils/trpc';
import {
  ChevronDoubleUpIcon,
  AnnotationIcon,
  ExternalLinkIcon
} from '@heroicons/react/solid';

type RedditResponse = inferQueryOutput<'reddit.front'>;

const Post = (post: RedditResponse['posts'][0]) => {
  return (
    <a
      href={`https://reddit.com/${post.permalink}`}
      target='_blank'
      className='flex flex-col p-4 space-y-1 border rounded-lg h-[400px] justify-between bg-black-400 border-black-300 hover:border-black-200 hover:cursor-pointer'
      rel='noreferrer'
    >
      <div className='flex flex-col flex-1 mb-4 space-y-3'>
        <div className='flex items-center space-x-3 truncate'>
          <div className='relative w-10 h-10 overflow-hidden rounded-full bg-black-100'>
            {post.subreddit_icon && (
              <Image
                src={post.subreddit_icon}
                alt=''
                layout='fill'
                objectFit='cover'
              />
            )}
          </div>
          <span className='text-sm text-gray-500'>
            ({post.is_self ? 'self.' : 'r/'}
            {post.subreddit})
          </span>
        </div>

        <h2 className='text-xl font-bold text-white line-clamp-2'>
          {post.title}
        </h2>
        <p className='text-xs font-semibold text-gray-400'>
          Yesterday - 2m Read Time
        </p>
      </div>

      <div className='relative w-full h-[155px] overflow-hidden rounded-xl'>
        {/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(post.url) && (
          <Image
            src={post.url}
            alt=''
            layout='fill'
            objectFit='cover'
            objectPosition='center'
          />
        )}
      </div>

      <div className='grid grid-cols-3 px-2 pt-4 gap-x-8'>
        <div className='flex items-center space-x-2 group'>
          <ChevronDoubleUpIcon className='w-6 h-6 text-gray-400 group-hover:text-gray-200' />
          <span className='text-sm font-semibold text-gray-400 group-hover:text-gray-200'>
            {post.upvotes}
          </span>
        </div>
        <div className='flex items-center space-x-2 group'>
          <AnnotationIcon className='w-6 h-6 text-gray-400 group-hover:text-gray-200' />
          <span className='text-sm font-semibold text-gray-400 group-hover:text-gray-200'>
            {post.num_comments}
          </span>
        </div>

        {/* <div className='flex items-center justify-end space-x-2 group'>
          <ExternalLinkIcon className='w-6 h-6 text-gray-400 group-hover:text-gray-200' />
          <span className='text-sm font-semibold text-gray-400 group-hover:text-gray-200'>
            Read
          </span>
        </div> */}
      </div>
    </a>
  );
};

export default Post;
