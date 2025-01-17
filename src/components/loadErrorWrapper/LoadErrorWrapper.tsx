import { PropsWithChildren } from 'react';

import { Skeleton } from 'antd';

import { ErrorState } from '../errorState';

type LoadErrorWrapperProps = {
  isLoading: boolean;
  isError: boolean;
} & PropsWithChildren;

export const LoadErrorWrapper: React.FC<LoadErrorWrapperProps> = ({
  isLoading,
  isError,
  children,
}) => {
  return (
    <>
      {isLoading ? (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} avatar active />
          ))}
        </>
      ) : isError ? (
        <ErrorState />
      ) : (
        <>{children}</>
      )}
    </>
  );
};
