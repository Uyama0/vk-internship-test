import { Dropdown, Space, Typography } from 'antd';
import type { MenuProps } from 'antd';

import { items } from '@/helpers';
import { useSetSearchParams } from '@/helpers';

export const SortRepositories: React.FC = () => {
  const { setSearchParams } = useSetSearchParams();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const [sort, order] = e.key.split('_');

    setSearchParams({
      sort: sort,
      order: order,
    });
  };

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }}>
      <Typography.Link>
        <Space>Сортировать</Space>
      </Typography.Link>
    </Dropdown>
  );
};
