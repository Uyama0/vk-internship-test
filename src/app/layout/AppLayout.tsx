import { Outlet } from 'react-router';
import { Layout } from 'antd';

import { PageHeader } from '@/components/pageHeader';

import styles from './styles.module.css';

export const AppLayout: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <PageHeader />
      <Outlet />
    </Layout>
  );
};
