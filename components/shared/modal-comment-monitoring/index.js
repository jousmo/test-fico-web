import { Avatar, Modal, Form, Input, List, Divider, Typography } from "antd"
import { UserOutlined } from "@ant-design/icons"
import "./style.sass"

export function ModalCommentMonitoring({ onCancel, ...props }) {
  const [form] = Form.useForm()

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
  }

  return (
    <Modal
      destroyOnClose
      title="Comentarios del folio: C0ED6D4A"
      onOk={null}
      okText="Agregar"
      onCancel={onCancelModal}
      cancelText="Cerrar"
      width={800}
      className="comment-modal-form"
      {...props}>
      <Form
        form={form}
        layout="vertical">
        <Form.Item
          name="comment">
          <Input.TextArea
            id="comment"
            placeholder="Describe tus comentarios" />
        </Form.Item>
      </Form>

      <List
        header={<Divider orientation="left">Comentarios 0</Divider>}>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />}
            title={
              <Typography.Text type="secondary">
                Tú <Typography.Text disabled>20 Enero 2020</Typography.Text>
              </Typography.Text>
            }
            description={
              <Typography.Text>
                Logramos los objetivos conforme a lo planteado, queremos agradecer el apoyo.
              </Typography.Text>
            } />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>F</Avatar>}
            title={
              <Typography.Text type="secondary">
                FICOSEC <Typography.Text disabled>21 Enero 2020</Typography.Text>
              </Typography.Text>
            }
            description={
              <Typography.Text>
                ¡De nada para eso estamos, para mejorar!
              </Typography.Text>
            } />
        </List.Item>
      </List>
    </Modal>
  )
}
