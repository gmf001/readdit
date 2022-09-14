import type { RedditPost } from '@/api/reddit/types';
import getThumbnail from '@/utils/getThumbnail';
import Image from 'next/image';

import { NSFW } from './nsfw';
import { VideoPost } from './video';

export const PostImage = (post: RedditPost) => {
  if (post.is_self && post.selftext) {
    return (
      <NSFW {...post}>
        <div className='prose text-dark-100 line-clamp-5'>{post.selftext}</div>
      </NSFW>
    );
  }

  if (post.secure_media?.reddit_video) {
    return (
      <NSFW {...post}>
        <VideoPost
          autoplay={post.over_18 ? false : true}
          src={post.secure_media.reddit_video}
        />
      </NSFW>
    );
  }

  return (
    <NSFW {...post}>
      <Image
        src={getThumbnail(post)}
        alt={post.title}
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
        layout='fill'
        className='h-full w-full object-cover object-center'
      />
    </NSFW>
  );
};
