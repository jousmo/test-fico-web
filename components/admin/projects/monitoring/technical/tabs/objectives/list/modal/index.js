import {
  Form,
  Modal,
  Row
} from "antd"
import { useEffect } from "react"

export function ObjectivesModal({ edit, ...props }) {
  const [form] = Form.useForm()

  useEffect(() => {
    if(edit) {
      form.setFieldsValue(edit)
      console.log(edit)
    }
  }, [edit])

  const onOk = async () => {
    try {
      const values = await form.getFieldsValue()
    }
    catch(e) {
      console.error(e)
    }
  }

  return (
    <Modal
      cancelText="Cancelar"
      onOk={onOk}
      okText="Guardar"
      {...props}>
      <Form
        form={form}
        name="indicator-form"
        layout="vertical">
        <Row gutter={[10, 8]} justify="start">
        </Row>
      </Form>
    </Modal>
  )
}
