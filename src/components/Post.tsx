import { RedditPost } from "@/types";
import Image from "next/image";

const Post = (post: RedditPost["data"]) => {
  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex justify-between items-center space-x-2 text-gray-500 text-xs">
          <span>u/{post.author}</span>
          <span>
            ({post.is_self ? "self." : "r/"}
            {post.subreddit})
          </span>
        </div>
        <h2 className="text-2xl font-bold my-5">{post.title}</h2>

        {/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(post.url) && (
          <div className="relative w-full h-auto aspect-video rounded overflow-hidden">
            <Image
              src={post.url}
              alt="thumbnail"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </div>
        )}

        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro error
          qui repellat iusto ipsa culpa, rerum at, perspiciatis laboriosam animi
          esse ipsum aut doloribus adipisci corporis quasi! Autem, soluta
          maiores.
        </div>
      </div>

      {/* comments */}
      <div></div>
    </>
  );
};

export default Post;
