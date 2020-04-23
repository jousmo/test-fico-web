import { Row, Col, Input } from "antd"
import { createRef } from "react"

export function InvestmentDistributionField({
  defaultValue = [
    { type: "IMPLEMENTER", label: "Implementadora", percentage: undefined },
    { type: "FICOSEC", label: "FICOSEC", percentage: undefined },
    { type: "ALLIED", label: "Aliado (s)", percentage: undefined }
  ],
  unitCost = 1.0,
  unitTotal = 1,
  onChange
}) {
  const rows = defaultValue.map(r => {
    r.inputRef = createRef()

    return r
  })

  const calculatePercentage = (percentage = 0) => {
    percentage = Number(percentage)

    const total = unitCost * unitTotal

    return percentage * total / 100
  }

  return (
    <>
      <Row>
        <Col span={12}>Inversor</Col>
        <Col span={6}>Porcentage</Col>
        <Col span={6}>Total</Col>
      </Row>

      {rows.map((r, i) =>
        <Row key={`investment-${i}`}>
          <Col span={12}>{ r.label }</Col>
          <Col span={6}>
            <Input
              type="text"
              name={`investment-${i}`}
              defaultValue={r.value}
              ref={r.inputRef} />
          </Col>
          <Col span={6}>
            { calculatePercentage(r.inputRef.current?.value) }
          </Col>
        </Row>
      )}
    </>
  )
}
