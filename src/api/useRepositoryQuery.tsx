import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { filterRepository } from '@/helpers/utils/filterRepository';
import { githubApiHost, githubApiToken } from '@/helpers';
import { repositoriesStore } from '@/app/store';
import { buildUrlWithParams } from '@/helpers';

type FetcherProps = {
  pageParam: number;
  sort: string | null;
  order: string | null;
};

const fetcher = async ({ pageParam, sort, order }: FetcherProps) => {
  const url = buildUrlWithParams(`${githubApiHost}/search/repositories`, {
    q: 'javascript',
    per_page: 10,
    page: pageParam,
    sort,
    order,
  });

  const headers: HeadersInit = {};

  if (githubApiToken) {
    headers.Authorization = `Bearer ${githubApiToken}`;
  }

  const response = await fetch(url, headers);

  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных');
  }
  const data = await response.json();

  return { data, nextPage: pageParam + 1 };
};

export const useRepositoryQuery = () => {
  const [params] = useSearchParams();
  const [queryKey, setQueryKey] = useState(() => [
    'repositories',
    params.get('sort'),
    params.get('order'),
  ]);
  const sort = params.get('sort');
  const order = params.get('order');

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) => fetcher({ pageParam, sort, order }),
    {
      getNextPageParam: ({ nextPage }) => nextPage,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    setQueryKey(['repositories', sort, order]);
  }, [sort, order]);

  useEffect(() => {
    refetch().then((response) => {
      const { data } = response;
      repositoriesStore.setRepositories(
        filterRepository(data?.pages[data.pages.length - 1].data)
      );
    });
  }, [queryKey, refetch]);

  const handleFetchNextPage = () => {
    fetchNextPage().then((response) => {
      const { data } = response;

      repositoriesStore.addRepositories(
        filterRepository(data?.pages[data.pages.length - 1].data)
      );
    });
  };

  return {
    data,
    isError,
    isLoading,
    error,
    refetch,
    isFetching,
    hasNextPage,
    fetchNextPage: handleFetchNextPage,
  };
};
