import { Snoo } from '@/utils/snoo';
import { z } from 'zod';

const sortBy = z.enum(['hot', 'best', 'new', 'top']);
export type SORT_BY = z.infer<typeof sortBy>;

export async function getPostsUnauthenticated(
  sortBy: SORT_BY,
  limit: number,
  after: string | undefined
) {
  const postValidator = z.object({
    kind: z.string(),
    data: z.object({
      after: z.string(),
      before: z.string().or(z.null()),
      children: z.array(
        z.object({
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
            likes: z.boolean().or(z.null()).default(null)
          })
        })
      )
    })
  });

  const url = `https://reddit.com/${sortBy}/.json?limit=${limit}&after=t3_${after}`;
  const res = await (await fetch(url)).json();

  return postValidator.parse(res).data;
}

export async function getPostsAuthenticated(
  sortBy: SORT_BY,
  limit: number,
  after: string | undefined,
  token: string
) {
  if (sortBy === 'best') {
    console.log('fetch best');
    return await (await Snoo(token)).getBest({ limit, after });
  }

  if (sortBy === 'top') {
    return await (await Snoo(token)).getTop('', { limit, after });
  }

  if (sortBy === 'new') {
    return await (await Snoo(token)).getNew('', { limit, after });
  }

  if (sortBy === 'hot') {
    return await (await Snoo(token)).getHot('', { limit, after });
  }
}

export async function getSubredditIcon(name: string) {
  const subredditValidator = z.object({
    kind: z.string(),
    data: z.object({
      icon_img: z.string().or(z.null())
    })
  });

  const res = await (
    await fetch(`https://reddit.com/r/${name}/about.json`)
  ).json();

  return subredditValidator.parse(res).data.icon_img;
}

export async function getSubscriptions(token: string) {
  return await (await Snoo(token)).getDefaultSubreddits({ limit: 20 });
}
