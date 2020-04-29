import { useForm } from "antd/lib/form/util"
import { Modal, Form, Row, Col, Input, Typography } from "antd"

export function ApprovalModal({ onSave, onCancel, ...props }) {
  const [form] = useForm()

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
        <Row justify="start">
          <Col flex="auto">
            <Typography.Text>
              Opinión técnica
            </Typography.Text>
            <br />
            <Typography.Text type="secondary" style={{fontSize: "10.5px"}}>
              En caso de que el consejo directivo necesite tomar en cuenta
              algunos puntos especiales para la aprobación de la solicitud
              descríbelo a continuación
            </Typography.Text>
            <Form.Item
              name="technical_opinion"
              style={{display: "inline"}}>
              <Input.TextArea
                id="technical_opinion"
                type="text"
                placeholder="Describe" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
