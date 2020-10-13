import { withForm } from "../../../helpers/withForm"
import { Descriptions, Typography } from "antd"
import {
  regions,
  strategicAxisTypes,
  preventionLevelTypes
} from "../../../helpers/selectOptions/implementer/submission"
import {
  projectStatusOptions
} from "../../../helpers/selectOptions/shared/project-status"
import {
  getReadableValue
} from "../../../helpers/selectOptions/getReadableValue"
import numeral from "numeral"
import { StatusTag } from "../../admin/projects/list/table/status-tag"

function SummaryBody({ data, admin, extra }) {
  const {
    name,
    region,
    status,
    budgeted,
    implementer,
    description,
    strategicAxis,
    preventionLevel,
  } = data

  return (
    <Descriptions
      column={5}
      size="small"
      title={<Typography.Title level={3}>{name}</Typography.Title>}>
      {admin &&
        <Descriptions.Item label="Implementadora" span={5}>
          {implementer?.name}
        </Descriptions.Item>
      }
      <Descriptions.Item span={6}>
        <StatusTag options={projectStatusOptions} value={status} />
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
      <Descriptions.Item span={5}>
        {description}
      </Descriptions.Item>
      {extra}
    </Descriptions>
  )
}

export default withForm(SummaryBody)
