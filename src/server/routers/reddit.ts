import { getSubscriptions } from '@/api/reddit';
import { getPosts, vote } from '@/reddit';
import { createRouter } from '@/server/createRouter';
import { z } from 'zod';

export const redditRouter = createRouter()
  .query('myPosts', {
    input: z.object({
      limit: z.number().default(25),
      sort: z.enum(['hot', 'best', 'new', 'top']).default('hot'),
      cursor: z.string().optional(),
      subreddit: z.string().optional()
    }),
    async resolve({ input, ctx }) {
      const { cursor, limit } = input;
      const posts = await getPosts({ ...input, token: ctx.accessToken });

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
  .query('mySubreddits', {
    async resolve({ ctx }) {
      if (!ctx.token) return;
      return getSubscriptions(ctx.token);
    }
  })
  .mutation('upvote', {
    input: z.object({ id: z.string(), url: z.string() }),
    async resolve({ input, ctx }) {
      if (!ctx.accessToken) return;
      console.log('upvoting', input.id);
      return vote(1, input.id, input.url, ctx.accessToken);
    }
  });
