import * as _ from "lodash"
import { Input, Row, Col } from "antd"
import { createRef } from "react"

export function MonthlyDistributionField({
  defaultValue = [],
  months = [],
  unitCost = 1.0,
  onChange
}) {
  const rows = months.map((label, index) => {
    const data = {}

    data.label = label
    data.value = defaultValue[index]
    data.inputRef = createRef()

    return data
  })

  const total = rows.reduce((t, r) => t + r.value, 0)

  return (
    <>
      <Row>
        <Col span={12}>Mes</Col>
        <Col span={6}>Unidades</Col>
        <Col span={6}>Costo</Col>
      </Row>

      {rows.map((r, i) =>
        <Row key={`month-${i}`}>
          <Col span={12}>{ r.label }</Col>
          <Col span={6}>
            <Input
              type="text"
              name={`month-${i}`}
              defaultValue={r.value}
              ref={r.inputRef} />
          </Col>
          <Col span={6}>
            { unitCost * Number(r.inputRef.current?.value || 0) }
          </Col>
        </Row>
      )}

      <Row>
        <Col span={12}>Total</Col>
        <Col span={6}></Col>
        <Col span={6}>{ total }</Col>
      </Row>
    </>
  )
}
