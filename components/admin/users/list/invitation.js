import { Modal, Form, Input } from "antd"
import { SelectField } from "../../../shared"
import { warning } from "../../../../helpers/alert"
import { getSelectValue } from "../../../../helpers/getSelectValue"

export function ModalInvitation ({ onSave, onCancel, ...props }) {
  const ROLES = [
    { label: "Implementadora", value: "IMPLEMENTER" },
    { label: "Administrador", value: "ADMIN" }
  ]

  const [form] = Form.useForm()

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
  }

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
      {...props}>
      <Form
        form={form}
        layout="vertical">
        <Form.Item
          label="Correo electronico"
          name="email"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="email" />
        </Form.Item>
        <Form.Item
          label="Tipo de rol"
          name="role"
          getValueFromEvent={getSelectValue}
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <SelectField
            id="role"
            options={ROLES} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
