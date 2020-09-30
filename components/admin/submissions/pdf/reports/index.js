import { Table } from "antd"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
moment.locale("es")
import PDFHeading from "../heading"
import "../style.sass"

export function ReportsPDF(){
  const {
    submissionResult
  } = useContext(AdminSubmissionContext)

  return (
    <div className="fico pdf reports">
      <PDFHeading title="Reportes mensuales" />
      <Table
        dataSource={submissionResult?.data?.Submission?.reports}
        pagination={false}
        rowKey={(row, index) => index}>
        <Table.Column
          render={(text, row) => {
            const range = moment.range(row.period[0], row.period[1])
            if (range.diff('months') > 0){
              const start = moment(row.period[0]).format("MMMM YYYY")
              const end = moment(row.period[1]).format("MMMM YYYY")
              return `Reporte trimestral ${start} - ${end}`
            } else {
              const period = moment(row.period[0]).format("MMMM YYYY")
              return `Reporte mensual ${period}`
            }
          }}
          title="Periodo" />
        <Table.Column
          render={(text, row) => (
            moment(row.submittedAt).format("DD/MM/YYYY")
          )}
          title="Fecha de entrega" />
      </Table>
    </div>
  )
}
