import { withForm } from "../../../helpers/withForm"
import { Descriptions, Typography } from "antd"
import {
  preventionLevelTypes,
  strategicAxisTypes,
  regions
} from "../../../helpers/selectOptions/implementer/submission"
import {
  projectStatusOptions
} from "../../../helpers/selectOptions/shared/project-status"
import {
  getReadableValue
} from "../../../helpers/selectOptions/getReadableValue"
import numeral from "numeral"

function SummaryBody({ data, extra, getTag }) {
  const {
    name,
    region,
    status,
    concepts,
    description,
    preventionLevel,
    strategicAxis,
  } = data

  const totalBudget = concepts?.reduce((result, concept) => (
    result + (concept.unitCost * concept.totalUnits)
  ), 0)

  /*Todo: Update agreement number and implementer values */

  return (
    <Descriptions
      column={5}
      size="small"
      title={<Typography.Title level={3}>{name}</Typography.Title>}>
      <Descriptions.Item label="Implementadora" span={5}>

      </Descriptions.Item>
      <Descriptions.Item span={5}>
        {getTag(status, projectStatusOptions)}
      </Descriptions.Item>
      <Descriptions.Item label="Acuerdo">

      </Descriptions.Item>
      <Descriptions.Item label="Nivel de prevención">
        {getReadableValue(preventionLevelTypes, preventionLevel)}
      </Descriptions.Item>
      <Descriptions.Item label="Región">
        {getReadableValue(regions, region)}
      </Descriptions.Item>
      <Descriptions.Item label="Eje">
        {getReadableValue(strategicAxisTypes, strategicAxis)}
      </Descriptions.Item>
      <Descriptions.Item label="Monto autorizado">
        {numeral(totalBudget).format("$0,0.00")}
      </Descriptions.Item>
      <Descriptions.Item span={5}>
        {description}
      </Descriptions.Item>
      {extra}
    </Descriptions>
  )
}

export default withForm(SummaryBody)
