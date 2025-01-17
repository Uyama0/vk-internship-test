import { useInfiniteQuery } from 'react-query';

import { filterRepository } from '@/helpers/filterRepository';
import { githubApiHost, githubApiToken } from '@/helpers/env';
import { repositoriesStore } from '@/app/store';

const fetcher = async (pageNumber: number = 0) => {
  const response = await fetch(
    `${githubApiHost}/search/repositories?q=javascript&per_page=10&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${githubApiToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных');
  }
  const data = await response.json();

  repositoriesStore.setRepositories([
    ...repositoriesStore.repositories,
    ...filterRepository(data),
  ]);

  return { data, nextPage: pageNumber + 1 };
};

export const useRepositoryQuery = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(['repositories'], () => fetcher(), {
    getNextPageParam: ({ nextPage }) => nextPage,
    staleTime: Infinity,
  });
  return {
    data,
    isError,
    isLoading,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
  };
};
