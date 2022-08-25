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
    subreddit_icon: z.string().or(z.null()).default(null),
    created: z.number(),
    likes: z.boolean().or(z.null()).default(null) // upvote(true)/downvote(false)/default(null)
  })
});

async function getPosts(sort: string, limit: number, after: string | null) {
  const postValidator = z.object({
    kind: z.string(),
    data: z.object({
      after: z.string(),
      before: z.string().or(z.null()),
      children: z.array(redditPost)
    })
  });

  const res = await (
    await fetch(BASE_URL + `/${sort}/.json?limit=${limit}&after=${after}`)
  ).json();

  return postValidator.parse(res).data;
}

async function getSubreddit(subreddit: string) {
  const subredditValidator = z.object({
    kind: z.string(),
    data: z.object({
      icon_img: z.string().or(z.null())
    })
  });

  const res = await (
    await fetch(BASE_URL + `/r/${subreddit}/about.json`)
  ).json();

  return subredditValidator.parse(res).data;
}

export const redditRouter = createRouter().query('front', {
  input: z
    .object({
      limit: z.number(),
      sort: z.string(),
      after: z.string().or(z.null())
    })
    .default({ limit: 25, sort: 'hot', after: null }),
  async resolve({ input }) {
    const posts = await getPosts(input.sort, input.limit, input.after);

    posts.children = await Promise.all(
      posts.children.map(async (post) => {
        const subName = post.data.subreddit;
        const { icon_img } = await getSubreddit(subName);
        const fallbackIcon =
          'https://user-images.githubusercontent.com/33750251/59486444-3699ab80-8e71-11e9-9f9a-836e431dcbfd.png';
        post.data.subreddit_icon = icon_img || fallbackIcon;
        return post;
      })
    );

    return posts;
  }
});
