import { trpc } from "@/api/trpc";
import Feed from "@/components/Feed";
import { FireIcon } from "@heroicons/react/solid";
import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  const { data } = trpc.useQuery(["reddit.front", {}]);
  const stories = data?.posts.filter((post) => post.is_video).slice(0, 4);

  console.log("videos", stories);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-24 h-full fixed top-0 p-4 bg-black-600">
        <div className="flex flex-col items-center space-y-4">
          <div className="group p-4 border border-black-300 rounded-full overflow-hidden">
            <FireIcon className="h-5 w-5 text-gray-300 group-hover:text-pink-300" />
          </div>
          <div className="group p-4 border border-black-300 rounded-full overflow-hidden">
            <FireIcon className="h-5 w-5 text-gray-300 group-hover:text-pink-300" />
          </div>
          <div className="group p-4 border border-black-300 rounded-full overflow-hidden">
            <FireIcon className="h-5 w-5 text-gray-300 group-hover:text-pink-300" />
          </div>
        </div>
      </div>

      <main className="flex-1 ml-[6rem]">
        <div className="grid grid-cols-2 h-full">
          <div className="overflow-y-scroll scrollbar-hide p-4">
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
            {data && <Feed posts={data.posts} />}
          </div>

          {data && (
            <div className="py-6 px-8 border-l bg-black-500 border-black-400 overflow-y-auto scrollbar-hide">
              <div className="flex flex-col space-y-5">
                <div className="flex justify-between items-center space-x-2 text-gray-500 text-xs">
                  <span>u/{data.posts[0]?.author}</span>
                  <span>
                    ({data.posts[0]?.is_self ? "self." : "r/"}
                    {data.posts[0]?.subreddit})
                  </span>
                </div>
                <h2 className="text-2xl font-bold my-5">
                  {data.posts[0]?.title}
                </h2>

                {data.posts[0] &&
                  /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(
                    data.posts[0].url
                  ) && (
                    <div className="relative w-full h-auto aspect-square rounded overflow-hidden">
                      <Image
                        src={data.posts[0].url}
                        alt="thumbnail"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </div>
                  )}

                <div>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Porro error qui repellat iusto ipsa culpa, rerum at,
                  perspiciatis laboriosam animi esse ipsum aut doloribus
                  adipisci corporis quasi! Autem, soluta maiores.
                </div>
              </div>

              {/* comments */}
              <div></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
