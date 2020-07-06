import * as _ from "lodash"
import { Input, Row, Col, Alert } from "antd"
import { CompositeField, Visibility } from "../../../../../../../shared"
import numeral from "numeral"

export function MonthlyDistributionField({
  defaultValue = [],
  months = [],
  unitCost = 0.0,
  setState,
  state
}) {
  const rows = months.map((label, index) => {
    const data = {}

    data.label = label
    data.value = defaultValue[index]

    return data
  })

  const displayMonthTotal = value =>
    numeral(unitCost * Number(value || 0)).format("$0,0.00")

  const onChange = newItems => {
    const { total } = state

    const units = newItems.reduce((acc, item) => (
      acc += Number(item.value)
    ), 0)

    setState({ total, overLimit: units > total })
  }

  if(!rows.length) {
    return (
      <Alert
        message={<>
          Para poder completar esta información debes definir primero
          una <strong>fecha de inicio</strong> y <strong>conclusión</strong> del
          proyecto en la sección de <strong>información general</strong> de
          la solicitud
        </>}
        type="warning"
        showIcon />
    )
  }

  return (
    <CompositeField
      defaultValue={rows}
      isAddDisabled
      onChange={onChange}>
      {({ items, updateItem }) => {
        const total = items.reduce((t, r) =>
          t + unitCost * Number(r.value || 0), 0
        )

        return <>
          <Row gutter={[10, 8]}>
            <Col span={12}>Mes</Col>
            <Col span={6}>Unidades</Col>
            <Col span={6}>Costo</Col>
          </Row>

          { items.map((item, index) =>
            <Row
              gutter={[10, 8]}
              key={`monthly-distribution-${item.uuid}`}>
              <Col span={12}>{ _.capitalize(item.label) }</Col>
              <Col span={6}>
                <Input
                  type="number"
                  name="value"
                  defaultValue={item.value}
                  onChange={updateItem(index)}
                  max={20}
                  min={0} />
              </Col>
              <Col span={6}>
                { displayMonthTotal(item.value) }
              </Col>
            </Row>
          )}

          <Row gutter={[10, 8]}>
            <Col span={12}>Total</Col>
            <Col span={6}></Col>
            <Col span={6}>{ numeral(total).format("$0,0.00") }</Col>
          </Row>

          <Visibility visible={state.overLimit}>
            <Row>
              <Col span={24}>
                <Alert
                  message="Atención: La suma de las unidades por mes no debe
                  superar el total de unidades del concepto."
                  showIcon
                  type="error" />
              </Col>
            </Row>
          </Visibility>
        </>
      }
      }
    </CompositeField>
  )
}
