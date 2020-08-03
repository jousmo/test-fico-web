import { withForm } from "../../../../../helpers/withForm"
import Link from "next/link"
import { Table } from "antd"
import { MinusSquareTwoTone } from "@ant-design/icons"
import {
  getReadableValue,
  implementer,
  shared
} from "../../../../../helpers/selectOptions"
import { Tooltip } from "../../../../shared"
import { getTotalApproved } from "../../../../admin/projects/list/table/helpers"
import { StatusTag } from "../../../../admin/projects/list/table/status-tag"

function ProjectListingTable({ data }) {
  const { projectStatusOptions, getFilterOptions } = shared
  const {
    submission: {
      strategicAxisTypes,
      regions
    }
  } = implementer

  const statusFilterOptions = getFilterOptions(projectStatusOptions)
  const axisFilterOptions = getFilterOptions(strategicAxisTypes)
  const regionFilterOptions = getFilterOptions(regions)

  // Will not need to filter data in client once server is fully working
  const dataSource = data?.filter(e => e.implementer?.id === 1)

  return (
    <Table
      dataSource={dataSource}
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
        onFilter={(value, record) => record.status.indexOf(value) === 0}
        render={text =>
          <StatusTag options={projectStatusOptions} value={text} />
        }
        title="Estatus" />
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

export default withForm(ProjectListingTable)
