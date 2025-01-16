import { Header } from 'antd/es/layout/layout';

import styles from './styles.module.css';

export const PageHeader: React.FC = () => {
  return <Header className={styles.header}>Repositories</Header>;
};
