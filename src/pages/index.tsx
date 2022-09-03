import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import autoAnimate from '@formkit/auto-animate';
import { trpc } from '@/api/trpc';
import Post from '@/components/Post';
import PostSkeleton from '@/components/PostSkeleton';
import Tags from '@/components/Tags';
import type { SORTS } from '@/api/reddit';

function Home() {
  const [query, setQuery] = useState<SORTS>('best');
  const [subreddit, setSubreddit] = useState<string | undefined>();

  const { ref, inView } = useInView();
  const parent = useRef(null);

  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching
  } = trpc.useInfiniteQuery(['reddit.myPosts', { sort: query, subreddit }], {
    getNextPageParam: (lastPage) => lastPage?.nextCursor
  });

  useEffect(() => {
    refetch();
  }, [query, subreddit, refetch]);

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        fetchNextPage();
      }, 500);
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
      <>
        <Tags query={query} setQuery={setQuery} />
        <div className='my-8 grid grid-cols-4 gap-x-8 gap-y-10'>
          {skeletonPosts(20)}
        </div>
      </>
    );
  }

  return (
    <>
      <Tags query={query} setQuery={setQuery} />
      <div
        ref={parent}
        className='my-8 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      >
        {data?.pages.map((page) =>
          page?.posts.map((post, key) => <Post key={key} {...post} />)
        )}
        {isFetchingNextPage && skeletonPosts(25)}
        {isRefetching && skeletonPosts(25)}
        <span ref={ref}></span>
      </div>
    </>
  );
}

export default Home;
