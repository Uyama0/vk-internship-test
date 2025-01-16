import { List, Skeleton, Avatar } from 'antd';

const data = [
  {
    id: 6498492,
    login: 'airbnb',
    avatar_url: 'https://avatars.githubusercontent.com/u/698437?v=4',
    description: 'JavaScript Style Guide',
  },
  {
    id: 10270250,
    login: 'facebook',
    avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
    description:
      'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
  },
];

export const RepositoryList: React.FC = () => {
  return (
    <List
      itemLayout="horizontal"
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a key="list-loadmore-edit">edit</a>,
            <a key="list-loadmore-more">more</a>,
          ]}
        >
          <Skeleton avatar title={false} loading={!true} active>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar_url} />}
              title={<a href="https://ant.design">{item.login}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </Skeleton>
        </List.Item>
      )}
    ></List>
  );
};
