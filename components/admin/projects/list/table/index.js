import { withForm } from "../../../../../helpers/withForm"
import Link from "next/link"
import { Table } from "antd"
import { MinusSquareTwoTone } from "@ant-design/icons"
import {
  implementer,
  shared
} from "../../../../../helpers/selectOptions"
import {
  getTag,
  getTotalApproved
} from "./helpers"
import {
  AxisTooltip
} from "./axis-tooltip"

function ProjectListingTable({ data }) {
  const { projectStatusOptions } = shared
  const {
    submission: {
      strategicAxisTypes,
      regions
    }
  } = implementer

  const statusFilterOptions = projectStatusOptions.map(option => (
    {text: option.label, value: option.value}
  ))

  const axisFilterOptions = strategicAxisTypes.map(option => (
    {text: option.label, value: option.value}
  ))

  const regionFilterOptions = regions.map(option => (
    {text: option.label, value: option.value}
  ))

  //Todo: Display agreement number and implementer name

  return (
    <Table
      dataSource={data}
      rowKey={(row, index) => index}
      size="small">
      <Table.Column
        width={1}
        title={<MinusSquareTwoTone />} />
      <Table.Column
        dataIndex="agreement"
        render={(text, record) =>
          <Link href={`/admin/submissions/${record.id}`}><a>{text}</a></Link>
        }
        title="Nº de Acuerdo" />
      <Table.Column
        dataIndex="name"
        title="Nombre de proyecto" />
      <Table.Column
        dataIndex="status"
        filters={statusFilterOptions}
        onFilter={(value, record) => record.status.indexOf(value) === 0}
        render={text => getTag(text, projectStatusOptions)}
        title="Estado" />
      <Table.Column
        dataIndex="implementer"
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

export default withForm(ProjectListingTable)
