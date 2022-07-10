import Image from "next/image";
import { inferQueryResponse } from "@/api/trpc";

interface Props {
  posts: inferQueryResponse<"reddit.front">["posts"];
  selectPost: React.Dispatch<React.SetStateAction<any>>;
}

const Feed = ({ posts, selectPost }: Props) => {
  return (
    <div className="flex flex-col w-full space-y-4">
      {posts?.map((post, _id) => {
        const isImage = /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(post.url);
        return (
          <div
            onClick={() => selectPost(post)}
            key={_id}
            className="group flex flex-col space-y-5 w-full bg-black-400 rounded-lg border border-black-200/50 p-5 hover:border-black-200"
          >
            <div className="flex justify-between items-center space-x-2 text-gray-500 text-xs">
              <span>u/{post.author}</span>
              <span>
                ({post.is_self ? "self." : "r/"}
                {post.subreddit})
              </span>
            </div>

            <div className="flex space-x-4">
              {isImage && (
                <div className="relative w-24 h-24 aspect-square rounded overflow-hidden">
                  <Image
                    src={post.url}
                    alt="thumbnail"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
              )}

              <div>
                <h3 className="font-bold text-lg">{post.title}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
