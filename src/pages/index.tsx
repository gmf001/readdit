import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import autoAnimate from '@formkit/auto-animate';
import { trpc } from '@/api/trpc';
import Post from '@/components/Post';
import PostSkeleton from '@/components/PostSkeleton';
import Tags from '@/components/Tags';
import type { SortBy } from '@/api/reddit/types';
import { useAtom } from 'jotai';
import { filterAtom } from '@/store';

function Home() {
  const [query, setQuery] = useState<SortBy>('best');
  const [filter] = useAtom(filterAtom);

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
    ['reddit.posts', { sort: query, subreddit: filter.value }],
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor
    }
  );

  useEffect(() => {
    refetch();
  }, [query, filter, refetch]);

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

  return (
    <div ref={parent}>
      <Tags query={query} setQuery={setQuery} />
      <div className='my-8 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {isLoading ? (
          skeletonPosts(20)
        ) : (
          <>
            {data?.pages.map((page) =>
              page?.posts.map((post, key) => <Post key={key} {...post} />)
            )}
            {isFetchingNextPage && skeletonPosts(25)}
            {isRefetching && skeletonPosts(25)}
            <span ref={ref}></span>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
