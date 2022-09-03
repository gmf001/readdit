import { getPosts, getSubscriptions, upvotePost } from '@/api/reddit';
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
    async resolve({ input }) {
      const { sort, limit, cursor, subreddit } = input;

      const posts = await getPosts(sort, limit, cursor, subreddit);

      let nextCursor: typeof cursor | undefined = undefined;

      if (posts.children.length >= limit) {
        const nextItem = posts.children.pop();
        nextCursor = nextItem!.id;
      }

      return {
        posts: posts.children,
        nextCursor
      };
    }
  })
  .query('mySubreddits', {
    async resolve({ ctx }) {
      if (!ctx.refreshToken) return;
      return await getSubscriptions(ctx.refreshToken);
    }
  })
  .mutation('upvote', {
    input: z.object({
      postId: z.string()
    }),
    async resolve({ ctx, input }) {
      if (!ctx.refreshToken) return;
      return await upvotePost(input.postId);
    }
  });
