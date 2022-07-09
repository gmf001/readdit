import { trpc } from "@/api/trpc";
import Feed from "@/components/Feed";
import Stories from "@/components/Stories";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { data } = trpc.useQuery(["reddit.front", { onlySelf: false }]);
  const stories = data?.posts.filter((post) => post.is_video).slice(0, 4);

  if (!data) {
    return <div></div>;
  }

  console.log("videos", stories);

  return (
    <div className="mt-8 max-w-screen-xl w-full mx-auto px-3.5">
      <Stories />
      <Feed posts={data?.posts} />
    </div>
  );
};

export default Home;
