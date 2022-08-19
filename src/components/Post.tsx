import Image from "next/image";
import { inferQueryOutput } from "@/utils/trpc";
import {
  ChevronDoubleUpIcon,
  AnnotationIcon,
  ShareIcon
} from "@heroicons/react/solid";

type RedditResponse = inferQueryOutput<"reddit.front">;

const Post = (post: RedditResponse["posts"][0]) => {
  return (
    <div className="flex flex-col p-4 space-y-1 border rounded-lg h-[400px] justify-between bg-black-400 border-black-300 hover:border-black-200 hover:cursor-pointer">
      <div className="flex flex-col flex-1 mb-4 space-y-3">
        <div className="flex items-center justify-between space-x-3 truncate">
          <div className="relative w-10 h-10 overflow-hidden rounded-full">
            {post.subreddit_icon && (
              <Image
                src={post.subreddit_icon}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
          <span className="text-sm text-gray-500">
            ({post.is_self ? "self." : "r/"}
            {post.subreddit})
          </span>
        </div>

        <h2 className="text-xl font-bold text-white line-clamp-2">
          {post.title}
        </h2>
        <p className="text-xs font-semibold text-gray-400">
          Yesterday - 2m Read Time
        </p>
      </div>

      <div className="relative w-full h-[155px] overflow-hidden rounded-xl">
        {/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(post.url) && (
          <Image
            src={post.url}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        )}
      </div>

      <div className="flex items-center justify-between px-2 pt-4">
        <div>
          <ChevronDoubleUpIcon className="w-6 h-6 text-gray-400" />
        </div>
        <div>
          <AnnotationIcon className="w-6 h-6 text-gray-400" />
        </div>
        <div>
          <ShareIcon className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Post;
