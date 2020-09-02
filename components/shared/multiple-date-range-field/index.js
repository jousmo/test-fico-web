import { Row, Col } from "antd"
import { CompositeField, DeleteButton, DateField } from ".."

export function MultipleDateRangeField({
  onChange,
  addLabel="Agregar fecha",
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
      onClickAdd={addNew => addNew({ value: undefined })}>
      {({items, removeItem, updateItem}) =>
        <div>
          {items?.map((item, index) =>
            <Row
              gutter={[10, 8]}
              justify="start"
              key={`date_${index}`}>
              <Col span={24}>
                <DateField
                  defaultValue={item.value}
                  id="value"
                  name="months"
                  onChange={updateItem(index)}
                  picker="month"
                  range
                  style={{ width: "90%" }} />
                <DeleteButton onClick={removeItem(index)} />
              </Col>
            </Row>
          )}
        </div>
      }
    </CompositeField>
  )
}
