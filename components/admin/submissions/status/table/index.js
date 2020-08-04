import { withForm } from "../../../../../helpers/withForm"
import { useContext } from "react"
import Link from "next/link"
import { Table } from "antd"
import { MinusSquareTwoTone } from "@ant-design/icons"
import { PageContext } from "../../../../../contexts/page"

function ListByStatusTable({ data }) {
  const { type } = useContext(PageContext)

  return (
    <Table dataSource={data}>
      <Table.Column
        width={1}
        title={<MinusSquareTwoTone />} />
      <Table.Column
        dataIndex="name"
        render={(text, record) =>
          <Link href={`/${type}/submissions/${record.id}`}>
            <a>{text}</a>
          </Link>
        }
        title="Solicitud" />
    </Table>
  )
}

export default withForm(ListByStatusTable)
