import { createRouter } from '@/server/createRouter';
import { redditRouter } from './reddit';
import superjson from 'superjson';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('reddit.', redditRouter);

export type AppRouter = typeof appRouter;
