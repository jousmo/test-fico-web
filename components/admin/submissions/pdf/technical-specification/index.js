import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import PDFHeading from "../heading"
import ObjectivePDF from "./objective"
import "../style.sass"

export function TechnicalSpecificationPDF(){
  const {
    submissionResult
  } = useContext(AdminSubmissionContext)

  const submission = submissionResult?.data?.Submission
  
  return (
    <div className="fico pdf technical-specification">
      <PDFHeading title="Especificación técnica" />
      <ObjectivePDF
        description={submission?.developmentObjective}
        indicators={submission?.developmentObjectiveIndicators}
        title="Objetivo de desarrollo" />
      <ObjectivePDF
        description={submission?.generalObjective}
        indicators={submission?.generalObjectiveIndicators}
        title="Objetivo general" />
    </div>
  )
}