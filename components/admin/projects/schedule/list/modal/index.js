import { Form, Modal, Row } from "antd"
import { useEffect } from "react"

export function ScheduleModal({ edit, onCancel, onSave, ...props }) {
  const [form] = Form.useForm()

  useEffect(() => {
    if(edit) {
      form.setFieldsValue(edit)
    }
  }, [edit])

  const onOk = async () => {
    try {
      await form.validateFields()
      const values = await form.getFieldsValue()

      onSave(values)
    }
    catch(e) {
      console.error(e)
    }
  }

  const onClose = () => {
    form.resetFields()
    onCancel()
  }

  return (
    <Modal
      destroyOnClose
      cancelText="Cancelar"
      onOk={onOk}
      width={600}
      onCancel={onClose}
      okText="Guardar"
      {...props}>
      <Form
        form={form}
        name="indicator-form">
        <Row gutter={[10, 8]} justify="start">
        </Row>
      </Form>
    </Modal>
  )
}
