import Image from "next/future/image";
import { inferQueryResponse } from "@/api/trpc";

interface Props {
  posts: inferQueryResponse<"reddit.front">["posts"];
}

const Feed = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {posts?.map((post, _id) => {
        const isImage = /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(post.url);
        return (
          <div
            key={_id}
            className="group flex flex-col space-y-3 w-full bg-black-400 rounded-lg border border-dark-500 p-5 hover:border-dark-400"
          >
            <div className="flex justify-between items-center space-x-2 text-gray-500 text-xs">
              <span>u/{post.author}</span>
              <span>
                ({post.is_self && "self."}
                {post.subreddit})
              </span>
            </div>

            <div>
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p>{JSON.stringify(post.is_video)}</p>
              <p>{JSON.stringify(post.media)}</p>
            </div>

            <div className="max-h-[400px] w-full overflow-hidden">
              {isImage && (
                <Image
                  src={post.url}
                  alt="thumbnail"
                  height={500}
                  width={500}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
