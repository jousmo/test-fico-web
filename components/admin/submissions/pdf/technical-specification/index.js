import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import PDFHeading from "../heading"
import "../style.sass"

export function TechnicalSpecificationPDF(){
  const {
    submissionResult
  } = useContext(AdminSubmissionContext)

  return (
    <div className="fico pdf technical-specification">
      <PDFHeading title="Especificación técnica" />
    </div>
  )
}