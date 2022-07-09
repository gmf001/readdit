import { redditClient } from "@/api/client";
import { createRouter } from "@/server/createRouter";
import { RedditResponse } from "@/types";
import { filterResponse } from "@/utils/filterResponse";
import { z } from "zod";

async function getHot({ sort, limit }: { sort: string; limit: number }) {
  return await (
    await redditClient.get<RedditResponse>(`/${sort}/.json?limit=${limit}`)
  ).data;
}

export const redditRouter = createRouter().query("front", {
  input: z.object({
    limit: z.number().default(50),
    sort: z.string().default("hot"),
    onlySelf: z.boolean().default(false)
  }),
  async resolve({ input }) {
    const { data } = await getHot({ ...input });
    return filterResponse(data, input.onlySelf);
  }
});
