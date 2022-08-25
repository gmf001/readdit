import { trpc } from '@/api/trpc';
import Post from '@/components/Post';
import PostSkeleton from '@/components/PostSkeleton';

function Home() {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    trpc.useInfiniteQuery(['reddit.infinitePosts', { limit: 20 }], {
      getNextPageParam: (lastPage) => {
        console.log('lastpage', lastPage);
        return lastPage.nextCursor;
      },
      keepPreviousData: true
    });

  console.log('data', data);

  if (isLoading) {
    return (
      <div className='my-8 grid grid-cols-4 gap-x-8 gap-y-10'>
        {Array(12)
          .fill(null)
          .map((_, id) => (
            <PostSkeleton key={id} />
          ))}
      </div>
    );
  }

  return (
    <div className='my-8 grid grid-cols-4 gap-x-8 gap-y-10'>
      {data?.pages.map((page, i) =>
        page.posts.map(
          (post, key) =>
            /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(post.data.url) && (
              <Post key={key} {...post.data} />
            )
        )
      )}
      <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
      </button>
    </div>
  );
}

export default Home;
