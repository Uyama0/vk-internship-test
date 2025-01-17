import { useState } from 'react';
import { Avatar, Button, Card, Flex } from 'antd';

import { RepositoryProps } from '@/helpers/types';
import { repositoriesStore } from '@/app/store';
import { EditModal } from '../editModal';

export const RepositorySnippet: React.FC<RepositoryProps> = ({
  id,
  login,
  avatar_url,
  description,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = (editedValues: RepositoryProps) => {
    repositoriesStore.editRepository(editedValues);
    setIsModalOpen(false);
  };

  return (
    <Card>
      <Flex align="center" gap="large" justify="space-between">
        <Card.Meta
          avatar={<Avatar src={avatar_url} />}
          title={login}
          description={description}
        />
        <Flex gap="small">
          <Button key="edit" onClick={() => setIsModalOpen(true)}>
            Edit
          </Button>
          <Button
            key="delete"
            danger
            onClick={() => repositoriesStore.deleteRepository(id)}
          >
            Delete
          </Button>
        </Flex>
      </Flex>
      <EditModal
        isVisible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleOk}
        {...{ id, login, avatar_url, description }}
      />
    </Card>
  );
};
