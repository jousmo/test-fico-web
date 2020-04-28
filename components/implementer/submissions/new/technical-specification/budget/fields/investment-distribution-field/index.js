import { Row, Col, Input } from "antd"
import { createRef } from "react"
import { CompositeField } from "../../../../../../../shared"
import numeral from "numeral"

export function InvestmentDistributionField({
  defaultValue = [
    { type: "IMPLEMENTER", name: "Implementadora", percentage: undefined },
    { type: "FICOSEC", name: "FICOSEC", percentage: undefined },
    { type: "ALLIED", name: "Aliado (s)", percentage: undefined }
  ],
  unitCost = 0.0,
  totalUnits = 0.0,
  onChange
}) {
  const displayTotal = (percentage = 0) => {
    percentage = Number(percentage)

    const total = Number(unitCost) * Number(totalUnits)

    if(total <= 0) {
      return numeral(0).format("$0,0.00")
    }

    return numeral(percentage * total / 100).format("$0,0.00")
  }

  return (
    <CompositeField
      defaultValue={defaultValue}
      isAddDisabled
      onChange={onChange}>
      {({ items, updateItem }) =>
        <>
          <Row gutter={[10, 8]}>
            <Col span={12}>Inversor</Col>
            <Col span={6}>Porcentaje</Col>
            <Col span={6}>Total</Col>
          </Row>

          {items.map((item, index) =>
            <Row
              gutter={[10, 8]}
              key={`investment-${item.uuid}`}>
              <Col span={12}>{ item.name }</Col>
              <Col span={6}>
                <Input
                  type="number"
                  name="percentage"
                  defaultValue={item.percentage}
                  onChange={updateItem(index)}
                  suffix="%"
                  max={100}
                  min={0} />
              </Col>
              <Col span={6}>
                { displayTotal(item.percentage) }
              </Col>
            </Row>
          )}
        </>
      }
    </CompositeField>
  )
}
