import { Snoo } from '@/utils/snoo';
import clsx from 'clsx';
import { z } from 'zod';

const REDDIT = 'https://www.reddit.com';

export type SORTS = z.infer<typeof sorts>;
export type POST = z.infer<typeof post>;

const sorts = z.enum(['hot', 'best', 'new', 'top']);

const post = z.object({
  id: z.string(),
  author: z.string(),
  title: z.string(),
  subreddit: z.string(),
  thumbnail: z.string(),
  permalink: z.string(),
  url: z.string(),
  is_video: z.boolean(),
  is_self: z.boolean(),
  is_twitter: z.boolean().nullish(),
  selftext: z.string().nullish(),
  num_comments: z.number(),
  ups: z.number(),
  created: z.number(),
  likes: z.boolean().nullish(), // has upvoted or not
  preview: z
    .object({
      images: z.array(
        z.object({
          source: z.object({
            url: z.string()
          })
        })
      )
    })
    .transform((i) => ({
      image: i.images[0]?.source.url.replace(/&amp;/g, '&')
    }))
    .nullish(),
  subreddit_data: z
    .object({
      title: z.string(),
      icon: z.string()
    })
    .default({ title: '', icon: '' })
});

export async function getPosts(
  sort: SORTS,
  limit: number,
  after: string | undefined,
  subreddit: string | undefined
) {
  const postValidator = z.object({
    data: z.object({
      after: z.string().nullish(),
      before: z.string().or(z.null()),
      children: z.array(z.object({ data: post }).transform((o) => o.data))
    })
  });

  let host = 'https://reddit.com';
  const params = `after=t3_${after}`;

  if (typeof subreddit === 'string') {
    host = host.concat('/' + subreddit);
  }

  const url = clsx(
    host,
    `/${sort}/.json?limit=${limit}`,
    after && `&${params}`
  ).replace(/\s/g, '');

  console.log('fetching url...', url);

  const res = await (await fetch(url)).json();

  const posts = postValidator.parse(res).data;

  posts.children = await Promise.all(
    posts.children.map(async (post) => {
      const { icon_img, title } = await getSubreddit(post.subreddit);
      post.subreddit_data.icon =
        icon_img ||
        'https://user-images.githubusercontent.com/33750251/59486444-3699ab80-8e71-11e9-9f9a-836e431dcbfd.png';
      post.subreddit_data.title = title;
      if (post.is_self && post.selftext?.includes('twitter')) {
        post.is_twitter = true;
      }
      return post;
    })
  );

  return posts;
}

export function getPostss({
  token,
  limit,
  sort,
  after,
  subreddit
}: {
  token: string;
  limit: number;
  sort: 'hot' | 'best' | 'new' | 'top';
  after: string | undefined;
  subreddit: string | undefined;
}) {
  return Snoo(token).then((r) => {
    if (sort == 'best') {
      return r.getBest({ after, limit });
    }

    if (sort == 'hot') {
      return r.getHot(subreddit, { after, limit });
    }

    if (sort == 'new') {
      return r.getNew(subreddit, { after, limit });
    }

    if (sort == 'top') {
      return r.getTop(subreddit, { after, limit });
    }
  });
}

async function getSubreddit(name: string) {
  const subredditValidator = z
    .object({
      data: z.object({
        icon_img: z.string().nullish(),
        title: z.string()
      })
    })
    .transform((o) => o.data);

  const res = await (
    await fetch(`https://reddit.com/r/${name}/about.json`)
  ).json();

  return subredditValidator.parse(res);
}

export function getSubreddit2(token: string, name: string) {
  return Snoo(token).then((r) => {
    return r.getSubreddit(name);
  });
}

// authenticated requests (use snoowrap)
export function getSubscriptions(token: string) {
  return Snoo(token).then((r) => {
    return r.getDefaultSubreddits({ limit: 40 });
  });
}

export function upvotePost(token: string, postId: string) {
  console.log('upvoting post', postId);
  return Snoo(token).then((r) => {
    r.getSubmission(postId).upvote();
  });
}
