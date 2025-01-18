import { Modal, Form, Input } from 'antd';

import { RepositoryProps } from '@/helpers';

interface EditModalProps extends RepositoryProps {
  isVisible: boolean;
  onCancel: () => void;
  onOk: (data: RepositoryProps) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isVisible = false,
  onCancel,
  onOk,
  login,
  description,
  id,
  avatar_url,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    form
      .validateFields()
      .then((values) => {
        onOk({ ...values, id, avatar_url });
      })
      .catch((error) => {
        console.log('Ошибка валидации:', error);
      });
  };

  return (
    <Modal
      title={<div style={{ textAlign: 'center' }}>Изменить данные</div>}
      open={isVisible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form
        layout="vertical"
        name={`edit_data_${id}`}
        initialValues={{
          login: login,
          description: description,
        }}
        form={form}
      >
        <Form.Item
          name="login"
          label="Name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
