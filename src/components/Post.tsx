import Image from 'next/image';
import { format, fromUnixTime } from 'date-fns';
import { ChevronDoubleUpIcon, AnnotationIcon } from '@heroicons/react/solid';
import type { Submission } from 'snoowrap';

const Post = ({ post }: { post: Submission }) => {
  const date = fromUnixTime(post.created);
  const formattedDate = format(date, 'd, MMM');

  return (
    <a
      href={`https://reddit.com/${post.permalink}`}
      target='_blank'
      className='group flex h-[400px] flex-col justify-between space-y-1 rounded-lg border border-dark-300 bg-dark-400 p-4 hover:cursor-pointer hover:border-dark-200'
      rel='noreferrer'
    >
      <div className='mb-4 flex flex-1 flex-col space-y-3'>
        <div className='flex items-center space-x-3 truncate'>
          <div className='relative h-10 w-10 overflow-hidden rounded-full bg-dark-100'>
            {post.subreddit.icon_img && (
              <Image
                src={post.subreddit.icon_img}
                alt={post.subreddit.title}
                layout='fill'
                objectFit='cover'
              />
            )}
          </div>
          <div className='text-xs font-semibold text-gray-500'>
            ({post?.subreddit_name_prefixed})
          </div>
        </div>

        <h2 className='text-xl font-bold text-white transition-colors duration-200 ease-in line-clamp-2 group-hover:text-primary-500'>
          {post.title}
        </h2>
        <p className='text-xs font-semibold text-gray-400'>
          Posted: {formattedDate}
        </p>
        <p>
          isVideo: {post.is_video ? 'true' : 'false'}, isSelf:{' '}
          {post.is_self ? 'true' : 'false'},
        </p>
      </div>

      <div className='relative h-[155px] w-full overflow-hidden rounded-xl'>
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
