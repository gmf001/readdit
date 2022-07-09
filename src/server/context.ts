import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

type ContextOptions = trpcNext.CreateNextContextOptions;

export const createContext = async ({ req, res }: ContextOptions) => {
  return { req, res };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
