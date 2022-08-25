import { getPosts, getSubreddit } from '@/api/reddit';
import { createRouter } from '@/server/createRouter';
import { z } from 'zod';

export const redditRouter = createRouter().query('infinitePosts', {
  input: z.object({
    limit: z.number().default(25),
    sort: z.string().default('hot'),
    cursor: z.string().nullish()
  }),
  async resolve({ input }) {
    const { sort, limit, cursor } = input;
    console.log('cursor', cursor);
    const posts = await getPosts(sort, limit, cursor);

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

    let nextCursor: typeof cursor | undefined = undefined;
    console.log('length', posts.children.length, limit);
    if (posts.children.length >= limit) {
      const nextItem = posts.children.pop();
      nextCursor = nextItem!.data.id;
    }

    return {
      posts: posts.children,
      nextCursor
    };
  }
});
