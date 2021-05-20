import { useState, useEffect } from "react"
import { Row, Col, Input, Alert } from "antd"
import { CompositeField, Visibility } from "../../../../../../../shared"
import numeral from "numeral"

export function InvestmentDistributionField({
  onChange,
  allies,
  value = [],
  unitCost = 0.0,
  totalUnits = 0.0,
  readOnly,
  state,
  setState
}) {
  const defaultValue = [
    { type: "IMPLEMENTER", name: "Implementadora", percentage: undefined },
    { type: "FICOSEC", name: "FICOSEC", percentage: undefined },
    { type: "ALLIED", name: allies?.[0], percentage: undefined },
    { type: "ALLIED", name: allies?.[1], percentage: undefined }
  ]

  if (!allies || allies?.length === 0) {
    defaultValue.length = 2
  } else if(defaultValue?.length === 4 && allies?.[1] ===  undefined) {
    defaultValue.pop()
  }

  const [distribution, setDistribution] = useState(defaultValue)

  useEffect(() => {
    if (value.length) {
      const newDistribution = [...value]
      const firstAllyIndex = newDistribution.findIndex(el => el.type.includes("ALLIED"))
      if (newDistribution[firstAllyIndex]?.name !== allies?.[0]) {
        newDistribution[firstAllyIndex].name = allies?.[0]
      }

      const secondAllyIndex = value.findIndex((el, index) =>
        el.type.includes("ALLIED") && index !== firstAllyIndex
      )
      if (newDistribution[secondAllyIndex]?.name !== allies?.[1]) {
        newDistribution[secondAllyIndex].name = allies?.[1]
      }
      setDistribution(newDistribution)
    }
  }, [value])

  const displayTotal = (percentage = 0) => {
    percentage = Number(percentage)

    const total = Number(unitCost) * Number(totalUnits)

    if(total <= 0) {
      return numeral(0).format("$0,0.00")
    }

    return numeral(percentage * total / 100).format("$0,0.00")
  }

  const onChangeInput = newItems => {
    const percentage = newItems.reduce((acc, item) => (
      acc += Number(item.percentage || 0)
    ), 0)

    onChange && onChange(newItems.map(el => ({ ...el, percentage: Number(el.percentage) || 0})))
    setState(percentage !== 100)
  }

  return (
    <CompositeField
      value={distribution}
      isAddDisabled
      onChange={onChangeInput}>
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
              key={`investment-${index}`}>
              <Col span={12}>{ item.name }</Col>
              <Col span={6}>
                <Input
                  type="number"
                  name="percentage"
                  disabled={readOnly}
                  defaultValue={0}
                  value={item.percentage}
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

          <Visibility visible={state}>
            <Row>
              <Col span={24}>
                <Alert
                  message="Atención: La suma de los porcentajes debe de ser igual a 100%."
                  showIcon
                  type="warning" />
              </Col>
            </Row>
          </Visibility>
        </>
      }
    </CompositeField>
  )
}
