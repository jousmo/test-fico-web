import { withForm } from "../../../../../helpers/withForm"
import { Table } from "antd"

function ProjectScheduleList({ data }) {
  const dataSource = []
  return (
    <>
      <Table
        className="activities-list"
        dataSource={dataSource}
        size="middle">
      </Table>
    </>
  )
}

export default withForm(ProjectScheduleList)
