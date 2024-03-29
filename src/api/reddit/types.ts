import { z } from 'zod';

export type SortBy = z.infer<typeof sortBy>;
export type RedditPost = z.infer<typeof post>;

const sortBy = z.enum(['hot', 'best', 'new', 'top']);

export const subscription = z.object({
  name: z.string(),
  title: z.string(),
  icon_img: z.string().nullish(),
  community_icon: z.string().nullish(),
  display_name: z.string(),
  header_img: z.string().nullish(),
  banner_img: z.string().nullish(),
  display_name_prefixed: z.string(),
  subscribers: z.number(),
  url: z.string(),
  public_description: z.string()
});

const previewImage = z
  .object({
    images: z.array(z.object({ source: z.object({ url: z.string() }) }))
  })
  .transform((i) => ({
    image: i.images[0]?.source.url.replace(/&amp;/g, '&')
  }))
  .nullish();

const media = z
  .record(
    z
      .object({
        s: z.object({ u: z.string() }).transform(({ u }) => u)
      })
      .transform(({ s }) => s)
  )
  .transform((o) => Object.values(o))
  .nullish();

export const post = z.object({
  id: z.string(),
  name: z.string(),
  author: z.string(),
  title: z.string(),
  subreddit: z.string(),
  sr_detail: subscription.nullish(),
  thumbnail: z.string(),
  permalink: z.string(),
  url: z.string(),
  is_video: z.boolean(),
  is_gallery: z.boolean().nullish(),
  is_self: z.boolean(),
  is_twitter: z.boolean().nullish(),
  selftext: z.string().nullish(),
  num_comments: z.number(),
  over_18: z.boolean(),
  ups: z.number(),
  created: z.number(),
  post_hint: z.string().nullish(),
  likes: z.boolean().nullish(), // has voted
  preview: previewImage,
  secure_media: z
    .object({
      reddit_video: z
        .object({ fallback_url: z.string() })
        .nullish()
        .transform((v) => v?.fallback_url)
    })
    .nullish(),
  media_metadata: media
});

export const postValidator = z.object({
  data: z.object({
    after: z.string().nullish(),
    before: z.string().nullish(),
    children: z.array(z.object({ data: post }).transform((o) => o.data))
  })
});

export const subscriptionValidator = z.object({
  data: z.object({
    after: z.string().nullish(),
    before: z.string().nullish(),
    children: z.array(z.object({ data: subscription }).transform((o) => o.data))
  })
});
