import { useEffect, useRef, PropsWithChildren, useCallback } from 'react';

interface InfiniteScrollProps extends PropsWithChildren {
  isFetching: boolean;
  fetchNextPage: () => void;
}

export const InfiniteScroll = ({
  isFetching,
  fetchNextPage,
  children,
}: InfiniteScrollProps) => {
  const isFetchingRef = useRef(isFetching);

  useEffect(() => {
    isFetchingRef.current = isFetching;
  }, [isFetching]);

  const handleScroll = useCallback(() => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      if (!isFetchingRef.current) {
        fetchNextPage();
      }
    }
  }, [fetchNextPage]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return <>{children}</>;
};
