import { redditClient } from "@/api/client";
import { createRouter } from "@/server/createRouter";
import { RedditResponse, RedditPost } from "@/types";
import { z } from "zod";

async function getPosts({ sort, limit }: { sort: string; limit: number }) {
  return await (
    await redditClient.get<RedditResponse>(`/${sort}/.json?limit=${limit}`)
  ).data;
}

async function getSubreddit(subreddit: string) {
  return await (
    await redditClient.get<{ data: { icon_img: string } }>(
      `/r/${subreddit}/about.json`
    )
  ).data;
}

async function filterResponse(data: RedditResponse["data"], onlySelf = false) {
  const responseData = {
    after: data.after,
    before: data.before,
    count: data.children.length,
    posts: data.children.map((post: RedditPost, i) => {
      return {
        title: post.data.title,
        author: post.data.author,
        subreddit: post.data.subreddit,
        subreddit_icon: "",
        thumbnail: post.data.url,
        permalink: post.data.permalink,
        url: post.data.url,
        is_video: post.data.is_video,
        is_self: post.data.thumbnail === "self" ? true : false,
        media: post.data.media,
        url_overridden_by_dest: post.data.url_overridden_by_dest
      };
    })
  };

  responseData.posts = await Promise.all(
    responseData.posts.map(async (post) => {
      const subName = post.subreddit;
      const { data: subbreddit } = await getSubreddit(subName);
      const fallbackIcon =
        "https://user-images.githubusercontent.com/33750251/59486444-3699ab80-8e71-11e9-9f9a-836e431dcbfd.png";
      return { ...post, subreddit_icon: subbreddit.icon_img || fallbackIcon };
    })
  );

  if (onlySelf) {
    responseData.posts = responseData.posts.filter((post) => post.is_self);
  }

  return responseData;
}

export const redditRouter = createRouter().query("front", {
  input: z.object({
    limit: z.number().default(50),
    sort: z.string().default("hot"),
    onlySelf: z.boolean().default(false)
  }),
  async resolve({ input }) {
    const { data: posts } = await getPosts({ ...input });
    return await filterResponse(posts, input.onlySelf);
  }
});
