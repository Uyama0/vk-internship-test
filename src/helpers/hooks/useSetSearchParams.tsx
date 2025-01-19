import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type Key = 'sort' | 'order';

type QueryParams = Partial<Record<Key, string>>;

export const useSetSearchParams = () => {
  const [params, setParams] = useSearchParams();

  const getParam = (key: string, defaultValue: string) => {
    return params.get(key) || defaultValue;
  };

  const setSearchParams = useCallback(
    (updates: QueryParams) => {
      setParams((prev) => {
        for (const key in updates) {
          const value = updates[key as Key];

          if (value === '' || value === undefined) {
            prev.delete(key);
          } else {
            prev.set(key, value);
          }
        }

        return prev;
      });
    },
    [setParams]
  );

  return { getParam, setSearchParams };
};
