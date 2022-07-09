import { IRedditPost } from "@/utils/filterResponse";
import Image from "next/future/image";

interface Props {
  posts?: IRedditPost[];
}

const Feed = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {posts?.map((post, _id) => {
        const isImage = /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(post.url);
        return (
          <div key={_id} className="flex flex-col w-full">
            <h3>{post.title}</h3>
            <p>{JSON.stringify(post.is_video)}</p>
            <p>{JSON.stringify(post.media)}</p>
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
