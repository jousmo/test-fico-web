import { withForm } from "../../../helpers/withForm"
import { Descriptions, Typography } from "antd"
import {
  preventionLevelTypes,
  scopeTypes
} from "../../../helpers/selectOptions/implementer/submission"
import {
  getReadableValue
} from "../../../helpers/selectOptions/getReadableValue"
import numeral from "numeral"

function SummaryBody({ data, extra }) {
  const {
    name,
    scope,
    concepts,
    description,
    preventionLevel
  } = data

  const totalBudget = concepts?.reduce((result, concept) => (
    result + (concept.unitCost * concept.totalUnits)
  ), 0)

  return (
    <Descriptions
      size="small"
      title={<Typography.Title level={3}>{name}</Typography.Title>}>
      <Descriptions.Item span={3}>
        {description}
      </Descriptions.Item>
      <Descriptions.Item label="Ámbito">
        {getReadableValue(scopeTypes, scope)}
      </Descriptions.Item>
      <Descriptions.Item  span={2} label="Nivel de prevención">
        {getReadableValue(preventionLevelTypes, preventionLevel)}
      </Descriptions.Item>
      <Descriptions.Item  span={3} label="Presupuesto total">
        {numeral(totalBudget).format("$0,0.00")}
      </Descriptions.Item>
      {extra}
    </Descriptions>
  )
}

export default withForm(SummaryBody)
