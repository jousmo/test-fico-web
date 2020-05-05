import { withForm } from "../../../helpers/withForm"
import { Descriptions, Typography } from "antd"
import {
  preventionLevelTypes,
  scopeTypes
} from "../../../helpers/selectOptions/implementer/submission"
import {
  getReadableValue
} from "../../../helpers/selectOptions/getReadableValue"

function SummaryBody({ data, extra }) {
  const {
    name,
    scope,
    description,
    preventionLevel
  } = data

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
      {extra}
    </Descriptions>
  )
}

export default withForm(SummaryBody)
