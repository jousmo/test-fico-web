import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import PDFHeading from "../heading"
import "../style.sass"

export function ReportsPDF(){
  const {
    submissionResult
  } = useContext(AdminSubmissionContext)

  return (
    <div className="fico pdf reports">
      <PDFHeading title="Reportes mensuales" />
    </div>
  )
}
