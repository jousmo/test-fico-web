import { Row, Col } from "antd"
import { CompositeField, DeleteButton, DateField } from ".."
import moment from "moment"

export function MultipleDateRangeField({
  onChange,
  addLabel="Agregar fecha",
  defaultValue=[],
  format,
  limitDates,
  value=[],
  review,
  ...props
}) {
  const onCompositeFieldChange = value => {
    onChange && onChange(value?.map(i => i.value))
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
      onClickAdd={addNew => addNew({ value: [] })}
      {...props}>
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
                  disabledDate={date => date && (date < moment(limitDates[0]) || date > moment(limitDates[1]))}
                  onChange={updateItem(index)}
                  picker="month"
                  range
                  format={format || "DD/MM/YYYY"}
                  style={{ width: "90%" }} />
                {!review && <DeleteButton onClick={removeItem(index)} />}
              </Col>
            </Row>
          )}
        </div>
      }
    </CompositeField>
  )
}
