import { Col, Form, Input, Row } from "antd"
import { DateField } from "../../../../../../shared/date-field"
import { DeleteButton } from "../../../../../../shared/delete-button"
import { CompositeField } from "../../../../../../shared/composite-field"

export function ScheduleField({ ...props }){
  const onAddSupport = addNew => {
    addNew({ date: undefined, place: undefined })
  }

  return (
    <CompositeField
      onClickAdd={onAddSupport}
      addLabel="Agregar evento"
      {...props}>
      {({ items, updateItem, removeItem }) =>
        <div>
          { items?.map((item, index) =>
            <Row
              gutter={[10, 8]}
              justify="start"
              key={`schedule_${index}`}>
              <Col span={11}>
                <Form.Item
                  label="Fecha">
                  <DateField
                    id="scheduledAt"
                    name="scheduledAt"
                    format="DD/MM/YYYY"
                    defaultValue={item.scheduledAt}
                    onChange={updateItem(index)}
                    fullWidth />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label="Lugar">
                  <Input
                    id="place"
                    name="place"
                    defaultValue={item.place}
                    onBlur={updateItem(index)}
                    type="text" />
                </Form.Item>
              </Col>
              <Col span={2}>
                <DeleteButton onClick={removeItem(index)} /></Col>
            </Row>
          ) }
        </div>
      }
    </CompositeField>
  )
}
