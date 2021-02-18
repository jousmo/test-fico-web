import { withForm, format } from "../../../../../helpers"
import Link from "next/link"
import { Table } from "antd"
import { MinusSquareTwoTone } from "@ant-design/icons"
import {
  getReadableValue,
  implementer,
  shared
} from "../../../../../helpers/selectOptions"
import { Tooltip } from "../../../../shared"
import { StatusTag } from "../../../../admin/projects/list/table/status-tag"

function ProjectListingTable({ data }) {
  const { projectStatusOptions, getFilterOptions } = shared
  const {
    submission: {
      strategicAxisTypes,
      regions
    }
  } = implementer

  const statusOptions = Array.from(projectStatusOptions)
  statusOptions.length = 6
  const statusFilterOptions = getFilterOptions(statusOptions)
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
        dataIndex="agreementNumber"
        render={(text, record) =>
          <Link href={`/implementer/projects/${record.id}`}><a>{text}</a></Link>
        }
        title="Aprobación" />
      <Table.Column
        dataIndex="name"
        title="Nombre de proyecto" />
      <Table.Column
        dataIndex="status"
        filters={statusFilterOptions}
        onFilter={(value, record) => record.status?.indexOf(value) === 0}
        render={text =>
          <StatusTag options={projectStatusOptions} value={text} />
        }
        title="Estatus" />
      <Table.Column
        dataIndex="region"
        filters={regionFilterOptions}
        onFilter={(value, record) => record.region?.indexOf(value) === 0}
        title="Región" />
      <Table.Column
        dataIndex="strategicAxis"
        filters={axisFilterOptions}
        onFilter={(value, record) => record.strategicAxis?.indexOf(value) === 0}
        render={text =>
          <Tooltip value={getReadableValue(strategicAxisTypes, text)} />
        }
        title="Eje" />
      <Table.Column
        dataIndex="budgeted"
        render={text => format.money(text)}
        title="Aprobado" />
    </Table>
  )
}

export default withForm(ProjectListingTable)
