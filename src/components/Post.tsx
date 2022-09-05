import Image from 'next/image';
import nFormatter from '@/utils/numberFormatter';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid';
import { trpc } from '@/api/trpc';
import clsx from 'clsx';
import type { RedditPost } from '@/api/reddit/types';
import { useState } from 'react';

const Post = (post: RedditPost) => {
  const context = trpc.useContext();
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

  const iconImage =
    post.sr_detail?.icon_img ||
    'https://user-images.githubusercontent.com/33750251/59486444-3699ab80-8e71-11e9-9f9a-836e431dcbfd.png';

  return (
    <div className='flex h-[400px] flex-col justify-between space-y-1 rounded-lg border border-dark-300 bg-dark-400 p-4 transition duration-100 ease-linear hover:border-dark-200/60'>
      <div className='mb-4 flex flex-1 flex-col space-y-3'>
        <div className='flex items-center space-x-3 truncate'>
          <div className='relative h-10 w-10 overflow-hidden rounded-full bg-dark-100'>
            <Image
              src={iconImage}
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
          <Image
            src={post.url}
            alt={post.title}
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
            layout='fill'
            className='h-full w-full object-cover object-center'
          />
        )}
        {post.preview?.image && (
          <Image
            src={post.preview?.image}
            alt={post.title}
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
            layout='fill'
            className='h-full w-full object-cover object-center'
          />
        )}
      </div>

      <div className='flex items-center justify-between pt-3'>
        <div className='flex items-center space-x-2 '>
          <ArrowUpIcon
            onClick={() => vote.mutate({ id: post.name, dir: 1 })}
            className={clsx(
              'h-4 w-4 cursor-pointer font-bold text-gray-400 hover:text-gray-200',
              hasLiked && '!text-orange-500'
            )}
          />

          <span className='text-xs font-semibold text-gray-400'>
            {nFormatter(post.ups, hasLiked)}
          </span>
          <ArrowDownIcon
            onClick={() => vote.mutate({ id: post.name, dir: -1 })}
            className='h-4 w-4 text-gray-400 hover:text-gray-200'
          />
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
