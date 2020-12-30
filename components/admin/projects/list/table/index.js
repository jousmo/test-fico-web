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
import { StatusTag } from "./status-tag"

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
          <Link href={`/admin/projects/${record.id}`}><a>{text}</a></Link>
        }
        title="Nº de Acuerdo" />
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
        title="Estado" />
      <Table.Column
        render={(text, record) => (
          record.implementer?.name || "N/A"
        )}
        title="Implementadora" />
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
