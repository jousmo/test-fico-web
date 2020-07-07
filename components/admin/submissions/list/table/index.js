import { withForm } from "../../../../../helpers/withForm"
import { Table } from "antd"

function SubmissionsListingTable({ data }) {
  return (
    <Table
      dataSource={data}
      rowKey={(row, index) => index}
      size="small">
    </Table>
  )
}

export default withForm(SubmissionsListingTable)
