import { withForm } from "../../../helpers/withForm"
import { Descriptions, Typography } from "antd"
import {
  regions,
  strategicAxisTypes,
  preventionLevelTypes
} from "../../../helpers/selectOptions/implementer/submission"
import {
  submissionStatusOptions
} from "../../../helpers/selectOptions/shared/submission-status"
import {
  getReadableValue
} from "../../../helpers/selectOptions/"
import numeral from "numeral"
import { StatusTag } from "../../admin/projects/list/table/status-tag"
import Link from "next/link"

function SummaryBody({ data, admin, extra }) {
  const {
    name,
    region,
    status,
    implementer,
    description,
    strategicAxis,
    preventionLevel,
    approved
  } = data

  return (
    <Descriptions
      column={5}
      size="small"
      title={<Typography.Title level={3}>{name}</Typography.Title>}>
      {admin &&
        <Descriptions.Item label="Implementadora" span={5}>
          <Link href={`/admin/implementer/${implementer?.id}`}>
            <a>{implementer?.name}</a>
          </Link>
        </Descriptions.Item>
      }
      <Descriptions.Item span={5}>
        <StatusTag options={submissionStatusOptions} value={status} />
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
        {numeral(approved).format("$0,0.00")}
      </Descriptions.Item>
      <Descriptions.Item span={5}>
        {description}
      </Descriptions.Item>
      {extra}
    </Descriptions>
  )
}

export default withForm(SummaryBody)
