import { Form, Input } from "antd"

export function SearchField({ onSearch }) {
  return (
    <Form
      layout="horizontal"
      name="search">
      <Form.Item label="Buscar">
        <Input.Search
          enterButton
          onSearch={onSearch}
          placeholder="Introduce tu busqueda" />
      </Form.Item>
    </Form>
  )
}
