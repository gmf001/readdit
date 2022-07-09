import type { RedditPost, RedditResponse } from "@/types";

export const filterResponse = (
  data: RedditResponse["data"],
  onlySelf = false
) => {
  const responseData = {
    after: data.after,
    before: data.before,
    count: data.children.length,
    posts: data.children.map((post: RedditPost) => {
      return {
        title: post.data.title,
        author: post.data.author,
        subreddit: post.data.subreddit,
        thumbnail: post.data.thumbnail,
        permalink: post.data.permalink,
        url: post.data.url,
        is_video: post.data.is_video,
        is_self: post.data.thumbnail === "self" ? true : false,
        media: post.data.media,
        url_overridden_by_dest: post.data.url_overridden_by_dest
      };
    })
  };

  if (onlySelf) {
    responseData.posts = responseData.posts.filter((post) => post.is_self);
  }

  return responseData;
};
