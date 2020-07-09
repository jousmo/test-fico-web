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
import { Tooltip } from "../../../../shared/tooltip"

function SubmissionsListingTable({ data }) {
  const { submissionStatusOptions, getFilterOptions } = shared
  const {
    submission: {
      strategicAxisTypes,
      regions
    },
  } = implementer

  const statusFilterOptions = getFilterOptions(submissionStatusOptions)
  const axisFilterOptions = getFilterOptions(strategicAxisTypes)
  const regionFilterOptions = getFilterOptions(regions)

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
          <Tooltip value={getReadableValue(strategicAxisTypes, text)} />
        }
        title="Eje" />
      <Table.Column
        render={(text, row) => getTotalApproved(row)}
        title="Aprobado" />
    </Table>
  )
}

export default withForm(SubmissionsListingTable)
