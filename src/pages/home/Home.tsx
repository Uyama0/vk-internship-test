import { Content } from 'antd/es/layout/layout';

import { RepositoryList } from '@/components/repositoryList';

import styles from './styles.module.css';

export const Home: React.FC = () => {
  return (
    <Content className={styles.content}>
      <RepositoryList />
    </Content>
  );
};
