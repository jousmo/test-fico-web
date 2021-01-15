import { Form, Radio } from "antd"

export function VisibilityRadio({ children, label, onChange, visible = true }) {
  return (
    <>
      <Form layout="vertical">
        <Form.Item label={label}>
          <Radio.Group defaultValue={visible} onChange={({ target: { value }}) => onChange(value)}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      {visible === true ? children : null}
    </>
  )
}
