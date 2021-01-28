import { Button, Form, Input } from "antd"

export function RecoverForm({ onSubmit }){
  return (
    <Form
      name="recover"
      layout="vertical"
      onFinish={onSubmit}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Por favor ingresa to correo" }]}>
        <Input placeholder="Correo" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  )
}
