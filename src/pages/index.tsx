import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import autoAnimate from '@formkit/auto-animate';
import { trpc } from '@/api/trpc';
import Post from '@/components/Post';
import PostSkeleton from '@/components/PostSkeleton';
import Tags from '@/components/Tags';

function Home() {
  const { ref, inView } = useInView();
  const parent = useRef(null);

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    trpc.useInfiniteQuery(['reddit.infinitePosts', { limit: 50 }], {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      keepPreviousData: true
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const skeletonPosts = (numPosts: number) => {
    return Array(numPosts)
      .fill(null)
      .map((_, id) => <PostSkeleton key={id} />);
  };

  if (isLoading) {
    return (
      <div className='my-8 grid grid-cols-4 gap-x-8 gap-y-10'>
        {skeletonPosts(50)}
      </div>
    );
  }

  return (
    <>
      <Tags />
      <div
        ref={parent}
        className='my-8 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      >
        {data?.pages.map((page, i) =>
          page.posts.map(
            (post, key) =>
              /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(post.data.url) && (
                <Post key={key} {...post.data} />
              )
          )
        )}
        {isFetchingNextPage && skeletonPosts(25)}
        <div ref={ref}></div>
        {/* <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
      </button> */}
      </div>
    </>
  );
}

export default Home;
