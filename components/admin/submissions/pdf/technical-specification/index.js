import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import PDFHeading from "../heading"
import ObjectivePDF from "./objective"
import SpecificObjectivePDF from "./specific-objectives"
import "../style.sass"

export function TechnicalSpecificationPDF(){
  const { data } = useContext(AdminSubmissionContext)

  const submission = data?.SubmissionObjectives

  return (
    <div className="fico pdf technical-specification">
      <PDFHeading title="Ficha técnica" />
      <ObjectivePDF
        description={submission?.developmentObjective}
        indicators={submission?.developmentObjectiveIndicators}
        title="Objetivo de desarrollo" />
      <ObjectivePDF
        description={submission?.generalObjective}
        indicators={submission?.generalObjectiveIndicators}
        title="Objetivo general" />
      {submission?.specificObjectives?.map((objective, index) => (
        <SpecificObjectivePDF
          key={index}
          index={index + 1}
          objective={objective} />
      ))}
    </div>
  )
}
