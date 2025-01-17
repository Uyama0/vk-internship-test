import { Alert, Flex } from 'antd';

import styles from './styles.module.css';

export const ErrorState: React.FC = () => {
  return (
    <Flex align="center" justify="center" className ={styles.error}>
      <Alert
        message="Что то пошло не так"
        description="Попробуйте перезагрузить страницу или повторите попытку позже."
        type="error"
        showIcon
      />
    </Flex>
  );
};
