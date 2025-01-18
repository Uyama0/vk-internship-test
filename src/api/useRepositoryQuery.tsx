import { useEffect } from 'react';

import { useInfiniteQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { filterRepository } from '@/helpers/utils/filterRepository';
import { githubApiHost, githubApiToken } from '@/helpers/utils/env';
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

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${githubApiToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных');
  }
  const data = await response.json();

  repositoriesStore.setRepositories([
    ...repositoriesStore.repositories,
    ...filterRepository(data),
  ]);

  return { data, nextPage: pageParam + 1 };
};

export const useRepositoryQuery = () => {
  const [params] = useSearchParams();
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
    ['repositories'],
    ({ pageParam = 0 }) => fetcher({ pageParam, sort, order }),
    {
      getNextPageParam: ({ nextPage }) => nextPage,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    refetch();
  }, [sort, order, refetch]);

  return {
    data,
    isError,
    isLoading,
    error,
    refetch,
    isFetching,
    hasNextPage,
    fetchNextPage,
  };
};
