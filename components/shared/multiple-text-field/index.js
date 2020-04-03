import { Form, Input, Row, Col } from "antd"
import { CompositeField } from "../composite-field"
import { DeleteButton } from "../delete-button"
import { v4 as uuid } from "uuid"

export function MultipleTextField({
  onChange,
  addLabel,
  defaultValue
}) {
  return (
    <CompositeField
      onChange={onChange}
      addLabel={addLabel}
      defaultValue={defaultValue}
      onClickAdd={addNew => addNew({ value: "", uuid: uuid() })}>
      {({items, removeItem, updateItem}) =>
        <div>
          {items.map((item, index) =>
            <Form.Item key={item.uuid}>
              <Row>
                <Col flex="auto">
                  <Input
                    onChange={updateItem(index)}
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
