import { redditClient } from '@/api/client';
import { createRouter } from '@/server/createRouter';
import { z } from 'zod';

const BASE_URL = 'https://reddit.com';

const redditPost = z.object({
  data: z.object({
    author: z.string(),
    title: z.string(),
    subreddit: z.string(),
    thumbnail: z.string(),
    permalink: z.string(),
    url: z.string(),
    is_video: z.boolean(),
    is_self: z.boolean(),
    num_comments: z.number(),
    ups: z.number(),
    subreddit_icon: z.string().optional()
  })
});

const redditValidator = z.object({
  kind: z.string(),
  data: z.object({
    after: z.string(),
    before: z.string().or(z.null()),
    children: z.array(redditPost)
  })
});

async function getPosts(sort: string, limit: number) {
  const res = await (
    await fetch(BASE_URL + `/${sort}/.json?limit=${limit}`)
  ).json();

  return redditValidator.parse(res);
}

async function getSubreddit(subreddit: string) {
  return await (
    await redditClient.get<{ data: { icon_img: string } }>(
      `/r/${subreddit}/about.json`
    )
  ).data;
}

export const redditRouter = createRouter().query('front', {
  input: z
    .object({
      limit: z.number(),
      sort: z.string()
    })
    .default({ limit: 50, sort: 'hot' }),
  async resolve({ input }) {
    const { data: posts } = await getPosts(input.sort, input.limit);
    posts.children = await Promise.all(
      posts.children.map(async (post) => {
        const subName = post.data.subreddit;
        const { data: subbreddit } = await getSubreddit(subName);
        const fallbackIcon =
          'https://user-images.githubusercontent.com/33750251/59486444-3699ab80-8e71-11e9-9f9a-836e431dcbfd.png';
        post.data.subreddit_icon = subbreddit.icon_img || fallbackIcon;
        return post;
      })
    );
    return posts;
  }
});
