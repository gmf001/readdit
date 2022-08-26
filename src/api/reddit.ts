import { z } from 'zod';

const BASE_URL = 'https://reddit.com';

export const redditPost = z.object({
  data: z.object({
    id: z.string(),
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

export async function getPosts(
  sort: string,
  limit: number,
  after: string | null | undefined
) {
  const postValidator = z.object({
    kind: z.string(),
    data: z.object({
      after: z.string(),
      before: z.string().or(z.null()),
      children: z.array(redditPost)
    })
  });

  const url = BASE_URL + `/${sort}/.json?limit=${limit}&after=t3_${after}`;
  const res = await (await fetch(url)).json();

  return postValidator.parse(res).data;
}

export async function getSubreddit(subreddit: string) {
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
