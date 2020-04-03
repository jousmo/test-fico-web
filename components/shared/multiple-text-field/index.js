import { Form, Input } from "antd"
import { CompositeField } from "../composite-field"

export function MultipleTextField({
  onChange,
  addLabel,
  defaultValue
}) {
  return (
    <CompositeField
      onChange={onChange}
      addLabel={addLabel}
      defaultValue={defaultValue}>
      {(items, removeItem, updateItem) =>
        <div>
          {items.map((item, index) =>
            <Form.Item key={item.uuid}>
              <Input
                onChange={updateItem(index)}
                defaultValue={item.value} />
            </Form.Item>
          )}
        </div>
      }
    </CompositeField>
  )
}
