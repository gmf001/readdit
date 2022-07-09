import Feed from "@/components/Feed";
import { useFront } from "@/api/reddit";
import type { NextPage } from "next";

const Home: NextPage = (props) => {
  const { data } = useFront(10);
  console.log(data);

  return (
    <div className="mt-8 max-w-screen-xl w-full mx-auto px-3.5">
      <Feed posts={data?.posts} />
    </div>
  );
};

export default Home;
