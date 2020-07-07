import { withForm } from "../../../../../helpers/withForm"
import { Table } from "antd"
import Moment from "moment"
Moment.locale("es")
import { capitalize } from "lodash"
import { MinusSquareTwoTone } from "@ant-design/icons"
import {
  getReadableValue,
  implementer,
  shared
} from "../../../../../helpers/selectOptions"
import { getTotalApproved } from "../../../projects/list/table/helpers"
import { AxisTooltip } from "../../../projects/list/table/axis-tooltip"

function SubmissionsListingTable({ data }) {
  const { submissionStatusOptions } = shared
  const {
    submission: {
      strategicAxisTypes,
      regions
    },
  } = implementer

  const statusFilterOptions = submissionStatusOptions.map(option => (
    {text: option.label, value: option.value}
  ))

  const axisFilterOptions = strategicAxisTypes.map(option => (
    {text: option.label, value: option.value}
  ))

  const regionFilterOptions = regions.map(option => (
    {text: option.label, value: option.value}
  ))

  return (
    <Table
      dataSource={data}
      rowKey={(row, index) => index}
      size="small">
      <Table.Column
        width={1}
        title={<MinusSquareTwoTone />} />
      <Table.Column
        dataIndex="createdAt"
        render={text => (
          capitalize(Moment(text).format("MMMM D, YYYY h:mm a"))
        )}
        title="Fecha de solicitud" />
      <Table.Column
        dataIndex="name"
        title="Nombre de proyecto" />
      <Table.Column
        dataIndex="status"
        filters={statusFilterOptions}
        onFilter={(value, record) => record.status.indexOf(value) === 0}
        render={text =>
          getReadableValue(submissionStatusOptions, text)
        }
        title="Estatus" />
      <Table.Column
        render={(text, record) => (
          record.implementer?.name || "N/A"
        )}
        title="Implementadora" />
      <Table.Column
        dataIndex="region"
        filters={regionFilterOptions}
        onFilter={(value, record) => record.region.indexOf(value) === 0}
        title="Región" />
      <Table.Column
        dataIndex="strategicAxis"
        filters={axisFilterOptions}
        onFilter={(value, record) => record.strategicAxis.indexOf(value) === 0}
        render={text =>
          <AxisTooltip options={strategicAxisTypes} text={text} />
        }
        title="Eje" />
      <Table.Column
        render={(text, row) => getTotalApproved(row)}
        title="Aprobado" />
    </Table>
  )
}

export default withForm(SubmissionsListingTable)
