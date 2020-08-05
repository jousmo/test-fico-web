import { Form, Input } from "antd"

export function SearchFieldPrimary({ style }) {
  return (
    <Form style={{...style}}>
      <Input.Search placeholder="Buscar" enterButton/>
    </Form>
  )
}