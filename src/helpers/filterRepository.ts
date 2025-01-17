import { RepositoryProps } from './types';

export const filterRepository = (
  data: Record<string, number | boolean | { [key: string]: any }[]>
): RepositoryProps[] => {
  if (!Array.isArray(data?.items)) return [];

  return data.items.map((item) => ({
    id: item.id,
    login: item.owner?.login || '',
    avatar_url: item.owner?.avatar_url || '',
    description: item.description || '',
  }));
};
