import { Col, Form, Modal, Row } from "antd"
import { UploadButtonForm } from "../../../../../../../shared"

export function BankStatementsModal({ onCancel, onSave, ...props }){
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
      title="Estados de cuenta"
      onOk={onOk}
      onCancel={onCancelModal}
      width={350}
      okText="Guardar archivos"
      cancelText="Cancelar"
      maskClosable={false}
      {...props}>
      <Form
        form={form}
        name="statements-form"
        layout="vertical">
        <Row gutter={[10, 8]} justify="start">
          <Col span={24}>
            <Form.Item
              name="documents"
              style={{ display: "inline" }}>
              <UploadButtonForm
                accept={"application/pdf,application/xml,.xml,.pdf"} maxFile={100}>
                Adjunta los estados de cuenta
              </UploadButtonForm>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
