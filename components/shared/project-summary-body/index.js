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
import { StatusTag } from "../../admin/projects/list/table/status-tag"

function SummaryBody({ data, extra }) {
  const {
    name,
    region,
    status,
    budgeted,
    implementer,
    description,
    strategicAxis,
    preventionLevel,
    agreementNumber,
  } = data

  return (
    <Descriptions
      column={6}
      size="small"
      title={<Typography.Title level={3}>{name}</Typography.Title>}>
      <Descriptions.Item label="Implementadora" span={6}>
        {implementer?.name}
      </Descriptions.Item>
      <Descriptions.Item span={6}>
        <StatusTag options={projectStatusOptions} value={status} />
      </Descriptions.Item>
      <Descriptions.Item label="Acuerdo">
        {agreementNumber}
      </Descriptions.Item>
      <Descriptions.Item label="Nivel de prevención">
        {
          preventionLevel?.map(level => (
            getReadableValue(preventionLevelTypes, level)
          )).join(", ")
        }
      </Descriptions.Item>
      <Descriptions.Item label="Región">
        {getReadableValue(regions, region)}
      </Descriptions.Item>
      <Descriptions.Item label="Eje">
        {getReadableValue(strategicAxisTypes, strategicAxis)}
      </Descriptions.Item>
      <Descriptions.Item
        label="Monto autorizado"
        span={2}
        style={{ paddingLeft: "50px" }}>
        {numeral(budgeted).format("$0,0.00")}
      </Descriptions.Item>
      <Descriptions.Item span={6}>
        {description}
      </Descriptions.Item>
      {extra}
    </Descriptions>
  )
}

export default withForm(SummaryBody)
