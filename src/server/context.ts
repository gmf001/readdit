import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';

type ContextOptions = trpcNext.CreateNextContextOptions;

export const createContext = async ({ req, res }: ContextOptions) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  return { req, res, session, token };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
