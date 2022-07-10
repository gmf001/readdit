import { trpc } from "@/api/trpc";
import Feed from "@/components/Feed";
import Post from "@/components/Post";
import { RedditPost } from "@/types";
import { FireIcon } from "@heroicons/react/solid";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const { data } = trpc.useQuery(["reddit.front", {}]);
  const [post, selectPost] = useState<RedditPost["data"]>();

  console.log("selectedPost", post);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-16 h-full fixed top-0 p-4 pt-6 bg-black-700">
        <div className="flex flex-col items-center space-y-4">
          <div className="group p-3.5 border border-dark-500 rounded-full overflow-hidden">
            <FireIcon className="h-4 w-4 text-gray-300 group-hover:text-pink-300" />
          </div>
          <div className="group p-3.5 border border-dark-500 rounded-full overflow-hidden">
            <FireIcon className="h-4 w-4 text-gray-300 group-hover:text-pink-300" />
          </div>
          <div className="group p-3.5 border border-dark-500 rounded-full overflow-hidden">
            <FireIcon className="h-4 w-4 text-gray-300 group-hover:text-pink-300" />
          </div>
        </div>
      </div>

      <main className="flex-1 ml-[4rem]">
        <div className="flex h-full justify-center">
          <div className="flex-grow lg:flex-shrink-0 overflow-y-scroll lg:max-w-xl xl:max-w-3xl scrollbar-hide p-4">
            <h2 className="text-3xl font-bold mt-4">Frontpage</h2>
            <div className="flex space-x-3 items-center my-8">
              <div className="p-2 text-sm cursor-pointer font-semibold w-24 text-center bg-black-400 rounded hover:text-pink-300 transition-colors duration-200 ease-linear">
                Hot
              </div>
              <div className="p-2 text-sm cursor-pointer font-semibold w-24 text-center bg-black-400 rounded hover:text-pink-300 transition-colors duration-200 ease-linear">
                Trending
              </div>
              <div className="p-2 text-sm cursor-pointer font-semibold w-24 text-center bg-black-400 rounded hover:text-pink-300 transition-colors duration-200 ease-linear">
                Random
              </div>
            </div>

            {/* feed */}
            {data && <Feed posts={data.posts} selectPost={selectPost} />}
          </div>

          <div className="hidden lg:block py-6 px-8 border-l bg-black-500 border-black-400 overflow-y-auto max-w-2xl scrollbar-hide">
            {post && <Post {...post} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
