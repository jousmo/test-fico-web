import {
  Modal,
  Form,
  Input,
  Divider,
  Radio
} from "antd"
import { getSelectValue, warning } from "../../../../../../../../helpers"
import { DateField } from "../../../../../../../shared"

export function ModalAssistants({ onSave, onCancel, ...props }) {
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
      title="Agregar asistente"
      width={600}
      okText="Guardar"
      cancelText="Cancelar"
      onOk={onSubmit}
      onCancel={onCancelModal}
      {...props}>
      <Form
        layout="vertical"
        form={form}>
        <Divider orientation="left">Información personal</Divider>
        <Form.Item
          label="Nombre:"
          name="name"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="name" />
        </Form.Item>
        <Form.Item
          label="Apellido paterno:"
          name="lastName"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="lastName" />
        </Form.Item>
        <Form.Item
          label="Apellido materno:"
          name="maidenName"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="maidenName" />
        </Form.Item>
        <Form.Item
          label="Género:"
          name="gender">
          <Radio.Group
            onChange={null}>
            <Radio value="M">Masculino</Radio>
            <Radio value="F">Femenino</Radio>
            <Radio value="O">Prefiero no decirlo</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Fecha de nacimiento:"
          name="birthdate"
          getValueFromEvent={getSelectValue}
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <DateField
            id="birthdate"
            style={{width: "100%"}}
            format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item
          label="CURP:"
          name="curp"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="curp" />
        </Form.Item>
        <Form.Item
          label="Teléfono:"
          name="phone"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="phone" />
        </Form.Item>
        <Divider orientation="left">Dirección</Divider>
        <Form.Item
          label="Estado:"
          name="state"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="state" />
        </Form.Item>
        <Form.Item
          label="Municipio:"
          name="municipality"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="municipality" />
        </Form.Item>
        <Form.Item
          label="Colonia:"
          name="colony"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="colony" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
