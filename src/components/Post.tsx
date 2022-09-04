import Image from 'next/image';
import nFormatter from '@/utils/numberFormatter';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid';
import type { POST } from '@/api/reddit';
import { trpc } from '@/api/trpc';
import clsx from 'clsx';

const Post = (post: POST) => {
  const context = trpc.useContext();
  const upvote = trpc.useMutation(['reddit.upvote'], {
    onSuccess() {
      context.invalidateQueries(['reddit.myPosts']);
    }
  });

  return (
    <div className='flex h-[400px] flex-col justify-between space-y-1 rounded-lg border border-dark-300 bg-dark-400 p-4 transition duration-100 ease-linear hover:border-dark-200/60'>
      <div className='mb-4 flex flex-1 flex-col space-y-3'>
        <div className='flex items-center space-x-3 truncate'>
          <div className='relative h-10 w-10 overflow-hidden rounded-full bg-dark-100'>
            {post.subreddit_data.icon && (
              <Image
                src={post.subreddit_data.icon}
                alt={post.subreddit_data.title}
                layout='fill'
                objectFit='cover'
              />
            )}
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
          <h2 className='text-xl font-bold text-white transition-colors duration-200 ease-in line-clamp-2 hover:text-indigo-300'>
            {post.title}
          </h2>
        </a>
        <p className='text-xs font-semibold text-gray-400'>u/{post.author}</p>
        {/* {post.is_twitter && post.selftext && (
          <>
            <blockquote
              className='twitter-tweet'
              data-dnt='true'
              data-theme='dark'
            >
              <p lang='en' dir='ltr'>
                Sources: The CFP Board of Managers has decided on a 12-team
                College Football Playoff during today&#39;s meeting.
              </p>
              &mdash; Pete Thamel (@PeteThamel){' '}
              <a href={post.selftext}>September 2, 2022</a>
            </blockquote>{' '}
          </>
        )} */}
      </div>

      <div className='relative h-[155px] w-full overflow-hidden rounded-xl'>
        {/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(post.url) && (
          <img
            src={post.url}
            alt={post.title}
            className='h-full w-full object-cover object-center'
          />
        )}
        {post.preview?.image && (
          <img
            src={post.preview?.image}
            alt={post.title}
            className='h-full w-full object-cover object-center'
          />
        )}
      </div>

      <div className='flex items-center justify-between pt-3'>
        <div className='flex items-center space-x-2 '>
          <ArrowUpIcon
            onClick={() => upvote.mutate({ postId: post.id })}
            className={clsx(
              'h-4 w-4 cursor-pointer font-bold text-gray-400 hover:text-gray-200',
              post.likes && '!text-orange-500'
            )}
          />

          <span className='text-xs font-semibold text-gray-400'>
            {nFormatter(post.ups)}
          </span>
          <ArrowDownIcon className='h-4 w-4 text-gray-400 hover:text-gray-200' />
        </div>
        <div className='flex items-center space-x-2'>
          <span className='text-xs font-semibold text-gray-400 hover:text-gray-200'>
            {nFormatter(post.num_comments)} comments
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
