import { Form, Input, Row, Col } from "antd"
import { CompositeField, DeleteButton } from ".."

export function MultipleTextField({
  onChange,
  addLabel="Agregar elemento",
  defaultValue=[],
  value=[]
}) {
  const onCompositeFieldChange = value => {
    onChange && onChange(value.map(i => i.value))
  }
  const transformDefaultValue = value => {
    return { value }
  }

  return (
    <CompositeField
      onChange={onCompositeFieldChange}
      addLabel={addLabel}
      defaultValue={defaultValue?.map(transformDefaultValue)}
      value={value?.map(transformDefaultValue)}
      onClickAdd={addNew => addNew({ value: "" })}>
      {({items, removeItem, updateItem}) =>
        <div>
          {items?.map((item, index) =>
            <Form.Item key={index}>
              <Row>
                <Col flex="auto">
                  <Input
                    name="value"
                    defaultValue={item.value}
                    onBlur={updateItem(index)} />
                </Col>
                <Col>
                  <DeleteButton
                    style={{ marginLeft: "10px" }}
                    onClick={removeItem(index)} />
                </Col>
              </Row>
            </Form.Item>
          )}
        </div>
      }
    </CompositeField>
  )
}
