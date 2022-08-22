import { trpc } from '@/api/trpc';
import Post from '@/components/Post';
import PostSkeleton from '@/components/PostSkeleton';

function Home() {
  const { data, isLoading } = trpc.useQuery(['reddit.front', {}]);

  if (isLoading) {
    return (
      <div className='grid grid-cols-4 my-8 gap-x-8 gap-y-6'>
        {Array(12)
          .fill(null)
          .map((_, id) => (
            <PostSkeleton key={id} />
          ))}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-4 my-8 gap-x-8 gap-y-6'>
      {data?.posts.map(
        (post, key) =>
          /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(post.url) && (
            <Post key={key} {...post} />
          )
      )}
    </div>
  );
}

export default Home;
