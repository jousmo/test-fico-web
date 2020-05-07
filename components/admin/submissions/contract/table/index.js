import { withForm } from "../../../../../helpers/withForm"
import Link from "next/link"
import { Table } from "antd"
import { MinusSquareTwoTone } from "@ant-design/icons"

function ContractsTable({ data }) {
  return (
    <Table dataSource={data}>
      <Table.Column
        title={<MinusSquareTwoTone />} />
      <Table.Column
        render={(text, record) =>
          <Link href={`/admin/submissions/${record.id}`}><a>{text}</a></Link>
        }
        title="Solicitud" />
    </Table>
  )
}

export default withForm(ContractsTable)
