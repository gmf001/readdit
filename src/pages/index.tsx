import { trpc } from "@/api/trpc";
import Post from "@/components/Post";

function Home() {
  const { data } = trpc.useQuery(["reddit.front", {}]);

  console.log("data", data?.posts);

  return (
    <main className="w-full px-4 mx-auto lg:px-0 max-w-screen-2xl">
      <h2>Front page</h2>
      <div className="grid grid-cols-4 my-8 gap-x-8 gap-y-6">
        {data?.posts.map(
          (post, key) =>
            /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(post.url) && (
              <Post key={key} {...post} />
            )
        )}
      </div>
    </main>
  );
}

export default Home;
