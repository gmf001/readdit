import { useEffect, useRef, useState } from 'react';
import { trpc } from '@/api/trpc';
import { useAtom } from 'jotai';
import { useInView } from 'react-intersection-observer';
import autoAnimate from '@formkit/auto-animate';
import { PostSkeleton, Post, Tags } from '@/components';
import { filterAtom } from '@/store';
import { useWindowSize } from 'usehooks-ts';
import type { SortBy } from '@/api/reddit';

function Home() {
  const { width } = useWindowSize();
  const limit = width <= 900 ? 9 : 17;

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
    ['reddit.posts', { sort: query, subreddit: filter.value, limit }],
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

  const skeletonPosts = () => {
    return Array(limit)
      .fill(null)
      .map((_, id) => <PostSkeleton key={id} />);
  };

  return (
    <div ref={parent}>
      <Tags query={query} setQuery={setQuery} />
      <div className='my-4 grid grid-cols-1 gap-y-5 sm:my-8 sm:grid-cols-2 sm:gap-x-4 md:gap-y-10 md:gap-x-8 lg:grid-cols-3 xl:grid-cols-4'>
        {isLoading ? (
          skeletonPosts()
        ) : (
          <>
            {data?.pages.map((page) =>
              page?.posts.map((post, key) => <Post key={key} {...post} />)
            )}
            {isFetchingNextPage && skeletonPosts()}
            {isRefetching && skeletonPosts()}
            <span ref={ref}></span>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
