import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import DevelopmentObjectiveForm from "./form"
import { Section } from "../../../../../shared"
import { FieldLabel } from "../../../../../shared"
import {
  DevelopmentObjectiveText
} from "../../general-information/development-objectives/form/development-objective-text"

export function DevelopmentObjective() {
  const {
    updateTechnicalSpecification,
    loading,
    error,
    data
  } = useContext(ImplementerSubmissionContext)

  const onChange = ({ currentTarget: { id, value } }) => {
    const newData = {}
    newData[id] = value

    updateTechnicalSpecification(newData)
  }

  return (
    <Section
      title={
        <FieldLabel
          helpText={<DevelopmentObjectiveText />}>
          Objetivo de desarrollo
        </FieldLabel>
      }>
      <DevelopmentObjectiveForm
        isLoading={loading}
        error={error}
        data={data}
        onChange={onChange} />
    </Section>
  )
}
