import { Form, Input, Row, Col } from "antd"
import { CompositeField } from "../composite-field"
import { DeleteButton } from "../delete-button"
import { v4 as uuid } from "uuid"
import { itemGenUuid } from "../../../helpers"

export function MultipleTextField({
  onChange,
  addLabel="Agregar elemento",
  defaultValue=[],
  value=[]
}) {
  const onCompositeFieldChange = value => {
    onChange && onChange(value.map(i => i.value))
  }
  const transformDefaultValue = string => {
    const item = { value: string }
    return item
  }

  return (
    <CompositeField
      onChange={onCompositeFieldChange}
      addLabel={addLabel}
      defaultValue={defaultValue.map(transformDefaultValue).map(itemGenUuid)}
      value={value.map(transformDefaultValue).map(itemGenUuid)}
      onClickAdd={addNew => addNew({ value: "", uuid: uuid() })}>
      {({items, removeItem, updateItem}) =>
        <div>
          {items.map((item, index) =>
            <Form.Item key={item.uuid}>
              <Row>
                <Col flex="auto">
                  <Input
                    name="value"
                    defaultValue={item.value}
                    onBlur={updateItem(index)}
                    defaultValue={item.value} />
                </Col>
                <Col>
                  <DeleteButton
                    style={{marginLeft: "10px"}}
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
