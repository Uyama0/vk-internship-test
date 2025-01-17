import { Avatar, Button, Card, Flex } from 'antd';

import { RepositoryProps } from '@/helpers/types';

export const RepositorySnippet: React.FC<RepositoryProps> = ({
  login,
  avatar_url,
  description,
}) => {
  return (
    <Card>
      <Flex align="center" gap="large" justify="space-between">
        <Card.Meta
          avatar={<Avatar src={avatar_url} />}
          title={login}
          description={description}
        />
        <Flex gap="small">
          <Button key="edit">Edit</Button>
          <Button key="delete" danger>
            Delete
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
