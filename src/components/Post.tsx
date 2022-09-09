import Image from 'next/image';
import clsx from 'clsx';
import { useState } from 'react';
import nFormatter from '@/utils/numberFormatter';
import { trpc } from '@/api/trpc';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid';
import { format } from 'timeago.js';
import type { RedditPost } from '@/api/reddit/types';
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

    if (post.sr_detail?.banner_img) {
      return (
        <Image
          src={post.sr_detail?.banner_img}
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
    <div className='flex flex-col justify-between space-y-1 rounded border border-dark-300 bg-dark-400 p-4 transition duration-100 ease-linear md:rounded-lg'>
      <div className='mb-4 flex flex-1 flex-col space-y-3'>
        <div className='flex items-center space-x-3 truncate'>
          <div className='relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-white md:h-10 md:w-10'>
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

      <div className='relative h-[125px] w-full flex-shrink-0 overflow-hidden rounded-xl text-sm sm:h-[155px]'>
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
