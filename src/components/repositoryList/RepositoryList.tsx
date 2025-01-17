import { Flex } from 'antd';
import { Observer } from 'mobx-react-lite';

import { RepositorySnippet } from '../repositorySnippet';
import { useRepositoryQuery } from '@/api/useRepositoryQuery';
import { LoadErrorWrapper } from '../loadErrorWrapper';
import { repositoriesStore } from '@/app/store';
import { InfiniteScroll } from '../infiniteScroll';

export const RepositoryList: React.FC = () => {
  const { isError, isLoading, fetchNextPage, isFetching } =
    useRepositoryQuery();

  return (
    <LoadErrorWrapper isLoading={isLoading} isError={isError}>
      <InfiniteScroll isFetching={isFetching} fetchNextPage={fetchNextPage}>
        <Flex vertical gap="middle">
          {repositoriesStore.repositories.map((repository) => (
            <Observer>
              {() => <RepositorySnippet key={repository.id} {...repository} />}
            </Observer>
          ))}
        </Flex>
      </InfiniteScroll>
    </LoadErrorWrapper>
  );
};
