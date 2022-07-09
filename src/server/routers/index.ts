import { createRouter } from "@/server/createRouter";
import { redditRouter } from "./reddit";

export const appRouter = createRouter().merge("reddit.", redditRouter);

export type AppRouter = typeof appRouter;
