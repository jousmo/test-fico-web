import { useContext } from "react"
import { Table } from "antd"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import PDFHeading from "../heading"
import "../style.sass"

export function SchedulePDF(){
  const {
    submissionResult
  } = useContext(AdminSubmissionContext)
  const submission = submissionResult?.data?.Submission

  return (
    <div className="fico pdf schedule">
      <PDFHeading title="Cronograma" />
      <Table bordered dataSource={dataSource} pagination={false}>
        <Table.Column
          dataIndex="activity"
          title="Actividad"/>
      </Table>
    </div>
  )
}
