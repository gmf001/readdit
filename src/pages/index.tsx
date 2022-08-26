import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import autoAnimate from '@formkit/auto-animate';
import { trpc } from '@/api/trpc';
import Post from '@/components/Post';
import PostSkeleton from '@/components/PostSkeleton';
import Tags from '@/components/Tags';
import { SORT_BY } from '@/api/reddit';

function Home() {
  const [query, setQuery] = useState<SORT_BY>('best');
  const { ref, inView } = useInView();
  const parent = useRef(null);

  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching
  } = trpc.useInfiniteQuery(
    ['reddit.infinitePosts', { limit: 50, sort: query }],
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor
    }
  );

  useEffect(() => {
    refetch();
  }, [query, refetch]);

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

  if (isLoading || isRefetching) {
    return (
      <>
        <Tags query={query} setQuery={setQuery} />
        <div className='my-8 grid grid-cols-4 gap-x-8 gap-y-10'>
          {skeletonPosts(50)}
        </div>
      </>
    );
  }

  console.log('frontpage', data);

  return (
    <>
      <Tags query={query} setQuery={setQuery} />
      <div
        ref={parent}
        className='my-8 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      >
        {data?.pages.map((page) =>
          page?.posts.map((post, key) => <Post key={key} post={post} />)
        )}
        {isFetchingNextPage && skeletonPosts(25)}
        <span ref={ref}></span>
      </div>
    </>
  );
}

export default Home;
