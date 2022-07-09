import { redditClient } from "@/api/client";
import { filterResponse, IRedditPost } from "@/utils/filterResponse";
import type { NextApiRequest, NextApiResponse } from "next";
import { filterChildren } from "@/utils/filterResponse";

export type ApiFrontResponse = {
  after: string;
  before: string;
  count: number;
  posts: IRedditPost[] | undefined;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiFrontResponse>
) => {
  let { sort, limit } = req.query;

  if (!sort) {
    sort = "hot";
  }

  if (!limit) {
    limit = "25"; // max limit is 25
  }

  console.log("limit", limit);
  const data = await (await redditClient.get(`/${sort}/.json?`)).data;
  const filteredData = filterResponse(data);
  const posts = filterChildren(filteredData, parseInt(limit.toString()));
  console.log(posts);
  res.status(200).json({
    after: filteredData.after,
    before: filteredData.before,
    count: posts.length,
    posts
  });
};

export default handler;
