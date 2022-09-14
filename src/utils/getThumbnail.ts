import { RedditPost } from '@/api/reddit/types';
import redditIcon from '/public/images/reddit-icon.png';

export default function getThumbnail(post: RedditPost) {
  if (/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(post.url)) {
    return post.url;
  }

  if (post.preview?.image) {
    return post.preview.image;
  }

  if (post.is_gallery && post.media_metadata?.[0]) {
    return post.media_metadata[0];
  }

  if (post.sr_detail?.banner_img) {
    return post.sr_detail.banner_img;
  }

  return (
    post.sr_detail?.community_icon || post.sr_detail?.icon_img || redditIcon
  );
}
