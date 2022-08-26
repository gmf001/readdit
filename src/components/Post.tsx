import Image from 'next/image';
import { format, fromUnixTime } from 'date-fns';
import { ChevronDoubleUpIcon, AnnotationIcon } from '@heroicons/react/solid';
import { POST } from '@/api/reddit';

const Post = (post: POST) => {
  const date = fromUnixTime(post.created);
  const formattedDate = format(date, 'd, MMM');

  return (
    <a
      href={`https://reddit.com${post.permalink}`}
      target='_blank'
      className='group flex h-[400px] flex-col justify-between space-y-1 rounded-lg border border-dark-300 bg-dark-400 p-4 hover:cursor-pointer hover:border-dark-200'
      rel='noreferrer'
    >
      <div className='mb-4 flex flex-1 flex-col space-y-3'>
        <div className='flex items-center space-x-3 truncate'>
          <div className='relative h-10 w-10 overflow-hidden rounded-full bg-dark-100'>
            {post.subreddit_data.icon && (
              <img
                src={post.subreddit_data.icon}
                alt={post.subreddit_data.title}
                className='h-full w-full object-cover'
              />
            )}
          </div>
          <div className='text-xs font-semibold text-gray-500'>
            (r/{post?.subreddit})
          </div>
        </div>

        <h2 className='text-xl font-bold text-white transition-colors duration-200 ease-in line-clamp-2 group-hover:text-primary-500'>
          {post.title}
        </h2>
        <p className='text-xs font-semibold text-gray-400'>
          Posted: {formattedDate}
        </p>
      </div>

      <div className='relative h-[155px] w-full overflow-hidden rounded-xl'>
        {/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(post.url) && (
          <img
            src={post.url}
            alt={post.title}
            className='h-full w-full object-cover object-center'
          />
        )}
      </div>

      <div className='grid grid-cols-3 gap-x-8 px-2 pt-4'>
        <div className='group flex items-center space-x-2'>
          <ChevronDoubleUpIcon className='h-5 w-5 text-gray-400 group-hover:text-gray-200' />
          <span className='text-xs font-semibold text-gray-400 group-hover:text-gray-200'>
            {post.ups}
          </span>
        </div>
        <div className='group flex items-center space-x-2'>
          <AnnotationIcon className='h-5 w-5 text-gray-400 group-hover:text-gray-200' />
          <span className='text-xs font-semibold text-gray-400 group-hover:text-gray-200'>
            {post.num_comments}
          </span>
        </div>
      </div>
    </a>
  );
};

export default Post;
