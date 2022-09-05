import { z } from 'zod';

export type SortBy = z.infer<typeof sortBy>;
export type RedditPost = z.infer<typeof redditPost>;

export const sortBy = z.enum(['hot', 'best', 'new', 'top']);

export const redditPost = z.object({
  id: z.string(),
  name: z.string(),
  author: z.string(),
  title: z.string(),
  subreddit: z.string(),
  sr_detail: z.object({
    title: z.string(),
    icon_img: z.string().nullish(),
    display_name: z.string(),
    header_img: z.string().nullish(),
    display_name_prefixed: z.string(),
    subscribers: z.number(),
    url: z.string(),
    public_description: z.string()
  }),
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
  likes: z.boolean().nullish(), // has voted
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
    .nullish()
});

export const redditPostValidator = z.object({
  data: z.object({
    after: z.string().nullish(),
    before: z.string().or(z.null()),
    children: z.array(z.object({ data: redditPost }).transform((o) => o.data))
  })
});
