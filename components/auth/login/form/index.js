import { Button, Form, Input } from "antd"

export function LoginForm({ onSubmit }){
  return (
    <Form
      name="login"
      layout="vertical"
      onFinish={onSubmit}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Porfavor ingresa to correo" }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Porfavor ingresa to contraseña" }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  )
}
