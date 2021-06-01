import { useEffect } from "react"
import { Col, Modal, Form, Input, Row } from "antd"
import { SelectField } from "../../../shared"
import { warning } from "../../../../helpers/alert"
import { getSelectValue } from "../../../../helpers/getSelectValue"

export function ModalInvitation ({ account, onSave, onCancel, ...props }) {
  const ROLES = [
    { label: "Implementadora", value: "IMPLEMENTER" },
    { label: "Administrador", value: "ADMIN" },
    { label: "Administrador asistente", value: "ADMIN_ASSISTANT" }
  ]

  const [form] = Form.useForm()

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
  }

  useEffect(() => {
    if (account) {
      form.setFieldsValue(account)
    }
  }, [account])

  const onSubmit = async () => {
    try {
      await form.validateFields()
      const values = await form.getFieldsValue()
      form.resetFields()
      onSave && onSave(values)
    } catch (e) {
      warning("Llena los campos requeridos")
      console.error(e)
    }
  }

  return (
    <Modal
      destroyOnClose
      title="Invitación a FICOSEC"
      width={600}
      okText="Enviar"
      cancelText="Cancelar"
      onOk={onSubmit}
      onCancel={onCancelModal}
      maskClosable={false}
      {...props}>
      <Form
        form={form}
        layout="vertical">
        <Row gutter={[10, 0]}>
          <Col span={24}>
            <Form.Item
              label="Correo electrónico"
              name="email"
              rules={[{ required: true, message: "El campo es requerido" }]}>
              <Input disabled={!!account} name="email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tipo de rol"
              name="role"
              getValueFromEvent={getSelectValue}
              rules={[{ required: true, message: "El campo es requerido" }]}>
              <SelectField
                id="role"
                disabled={!!account}
                options={ROLES} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Alias"
              name="displayName"
              rules={[{ required: true, message: "El campo es requerido" }]}>
              <Input name="displayName" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
