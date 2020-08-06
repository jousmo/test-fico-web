import { Modal, Form, Input, Typography } from "antd"

export function ApprovalModal({ onSave, onCancel, ...props }) {
  const [form] = Form.useForm()

  const onOk = async () => {
    try {
      const values = await form.getFieldsValue()

      onSave(values)
      form.resetFields()
    }
    catch(e) {
      console.error(e)
    }
  }

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
  }

  return (
    <Modal
      title="Aprobación para consejo directivo"
      onOk={onOk}
      onCancel={onCancelModal}
      width={800}
      okText="Enviar"
      cancelText="Cancelar"
      {...props}>
      <Form
        form={form}
        name="indicator-form"
        layout="vertical">
        <Typography.Text>
          Opinión técnica
        </Typography.Text>
        <br />
        <Typography.Text type="secondary">
          <small>
            En caso de que el consejo directivo necesite tomar en cuenta
            algunos puntos especiales para la aprobación de la solicitud
            descríbelo a continuación
          </small>
        </Typography.Text>
        <Form.Item
          name="technicalNotes"
          style={{display: "inline"}}>
          <Input.TextArea
            id="technicalNotes"
            type="text"
            placeholder="Describe" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
