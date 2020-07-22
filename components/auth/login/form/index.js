import { Button, Form, Input } from "antd"
import Link from "next/link"

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
      <small>
        ¿Olvidaste tu contraseña?
        &nbsp;
        <Link href="/password-recovery">
          <a>Click aqui</a>
        </Link>
      </small>
    </Form>
  )
}
