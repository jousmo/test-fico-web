import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import PDFHeading from "../heading"
import DevelopmentObjectivePDF from "./development-objective"
import "../style.sass"

export function TechnicalSpecificationPDF(){
  const {
    submissionResult
  } = useContext(AdminSubmissionContext)

  const submission = submissionResult?.data?.Submission
  
  return (
    <div className="fico pdf technical-specification">
      <PDFHeading title="Especificación técnica" />
      <DevelopmentObjectivePDF
        description={submission?.developmentObjective}
        indicators={submission?.developmentObjectiveIndicators} />
    </div>
  )
}