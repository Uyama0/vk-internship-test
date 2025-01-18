import { MenuProps } from 'antd';

export const items: MenuProps['items'] = [
  {
    key: '',
    label: 'Сортировать по порядку',
  },
  {
    key: 'stars_asc',
    label: 'Сортировать по звёздам (по возрастрания)',
  },
  {
    key: 'stars_desc',
    label: 'Сортировать по звёздам (по убыванию)',
  },
  {
    key: 'forks_asc',
    label: 'Сортировать по форкам (по возрастрания)',
  },
  {
    key: 'forks_desc',
    label: 'Сортировать по форкам (по убыванию)',
  },
] as const;
