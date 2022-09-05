import { getSubscriptions, getPosts, vote } from '@/api/reddit';
import { createRouter } from '@/server/createRouter';
import { z } from 'zod';

export const redditRouter = createRouter()
  .query('posts', {
    input: z.object({
      limit: z.number().default(25),
      sort: z.enum(['hot', 'best', 'new', 'top']).default('hot'),
      cursor: z.string().optional(),
      subreddit: z.string().optional()
    }),
    async resolve({ input, ctx }) {
      const { cursor, limit } = input;
      const posts = await getPosts({ ...input, token: ctx.token });

      let nextCursor: typeof cursor | undefined = undefined;

      if (posts.children.length >= limit) {
        const nextItem = posts.children.pop();
        nextCursor = nextItem!.name;
      }

      return {
        posts: posts.children,
        nextCursor
      };
    }
  })
  .query('subscriptions', {
    async resolve({ ctx }) {
      if (!ctx.token) return;
      return getSubscriptions(ctx.token);
    }
  })
  .mutation('vote', {
    input: z.object({
      dir: z.number(),
      id: z.string()
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token) return;
      return vote({ ...input, token: ctx.token });
    }
  });
