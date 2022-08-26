import {
  getPostsAuthenticated,
  getPostsUnauthenticated,
  getSubredditIcon,
  getSubscriptions
} from '@/api/reddit';
import { createRouter } from '@/server/createRouter';
import { z } from 'zod';

export const redditRouter = createRouter()
  .query('infinitePosts', {
    input: z.object({
      limit: z.number().default(25),
      sort: z.enum(['hot', 'best', 'new', 'top']).default('hot'),
      cursor: z.string().optional()
    }),
    async resolve({ input, ctx }) {
      const { sort, limit, cursor } = input;
      const refreshToken = ctx.session?.refreshToken;

      if (typeof refreshToken === 'string') {
        console.log('authenticated posts');
        const posts = await getPostsAuthenticated(
          sort,
          limit,
          cursor,
          refreshToken
        );

        if (!posts) return;

        let nextCursor: typeof cursor | undefined = undefined;
        if (posts.length >= limit) {
          const nextItem = posts.pop();
          nextCursor = nextItem!.id;
        }

        return { posts, nextCursor };
      } else {
        return;
        // console.log('unauthenticated posts');
        // const posts = await getPostsUnauthenticated(sort, limit, cursor);

        // posts.children = await Promise.all(
        //   posts.children.map(async (post) => {
        //     const name = post.data.subreddit;
        //     const icon_img = await getSubredditIcon(name);
        //     post.data.subreddit_icon = icon_img;
        //     return post;
        //   })
        // );

        // let nextCursor: typeof cursor | undefined = undefined;

        // if (posts.children.length >= limit) {
        //   const nextItem = posts.children.pop();
        //   nextCursor = nextItem!.data.id;
        // }

        // return {
        //   posts: posts.children.map((post) => post.data),
        //   nextCursor
        // };
      }
    }
  })
  .query('mySubreddits', {
    async resolve({ ctx }) {
      const refreshToken = ctx.session?.refreshToken;
      if (typeof refreshToken !== 'string') return;
      return await getSubscriptions(refreshToken);
    }
  });
