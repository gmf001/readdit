import { Snoo } from '@/utils/snoo';
import { z } from 'zod';

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
  num_comments: z.number(),
  ups: z.number(),
  created: z.number(),
  likes: z.boolean().or(z.null()).default(null),
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

  let host = 'https://reddit.com/';
  const params = `after=t3_${after}`;

  if (typeof subreddit === 'string') {
    host = host.concat(subreddit);
  }

  const url = host + `/${sort}/.json?limit=${limit}&${params}`;
  console.log('url', url);

  const res = await (await fetch(url)).json();

  const posts = postValidator.parse(res).data;

  posts.children = await Promise.all(
    posts.children.map(async (post) => {
      const { icon_img, title } = await getSubreddit(post.subreddit);
      post.subreddit_data.icon =
        icon_img ||
        'https://user-images.githubusercontent.com/33750251/59486444-3699ab80-8e71-11e9-9f9a-836e431dcbfd.png';
      post.subreddit_data.title = title;
      return post;
    })
  );

  return posts;
}

export async function getSubreddit(name: string) {
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

// authentication required
export async function getSubscriptions(token: string) {
  return await (await Snoo(token)).getDefaultSubreddits({ limit: 40 });
}
