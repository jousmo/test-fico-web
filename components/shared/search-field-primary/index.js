import { Form, Input } from "antd"

export function SearchFieldPrimary({ style, onSearch = null }) {
  return (
    <Form style={{...style}}>
      <Input.Search
        placeholder="Buscar"
        onSearch={onSearch}
        enterButton />
    </Form>
  )
}
