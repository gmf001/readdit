import Image from 'next/image';
import nFormatter from '@/utils/numberFormatter';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid';
import { trpc } from '@/api/trpc';
import clsx from 'clsx';
import type { RedditPost } from '@/api/reddit/types';
import { useState } from 'react';
import redditIcon from '/public/images/reddit-icon.png';

const Post = (post: RedditPost) => {
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
    post.sr_detail?.community_icon || post.sr_detail?.icon_img || redditIcon;

  const renderPlaceholder = () => {
    if (post.is_self && post.selftext) {
      return (
        <div>
          <p className='text-dark-100 line-clamp-6'>{post.selftext}</p>
        </div>
      );
    }

    if (post.is_video && post.secure_media) {
      return (
        <video
          className='h-full w-full bg-dark-600'
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline
        >
          <source
            data-src={post.secure_media.reddit_video}
            src={post.secure_media.reddit_video}
            type='video/mp4'
          />
        </video>
      );
    }

    if (/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(post.url)) {
      return (
        <Image
          src={post.url}
          alt={post.title}
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
          layout='fill'
          className='h-full w-full object-cover object-center'
        />
      );
    }

    if (post.preview?.image) {
      return (
        <Image
          src={post.preview?.image}
          alt={post.title}
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
          layout='fill'
          className='h-full w-full object-cover object-center'
        />
      );
    }

    if (post.is_gallery && post.gallery_data?.items[0]) {
      return (
        <Image
          src={post.gallery_data.items[0].url}
          alt={post.title}
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
          layout='fill'
          className='h-full w-full object-cover object-center'
        />
      );
    }

    return (
      <Image
        src={iconImage}
        alt={post.title}
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
        layout='fill'
        className='h-full w-full object-cover object-center'
      />
    );
  };

  return (
    <div className='flex h-[400px] flex-col justify-between space-y-1 rounded-lg border border-dark-300 bg-dark-400 p-4 transition duration-100 ease-linear hover:border-dark-200/60'>
      <div className='mb-4 flex flex-1 flex-col space-y-3'>
        <div className='flex items-center space-x-3 truncate'>
          <div className='relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-white'>
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
      </div>

      <div className='relative h-[155px] w-full overflow-hidden rounded-xl'>
        {renderPlaceholder()}
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
