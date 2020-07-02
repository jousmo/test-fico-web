import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import GeneralObjectiveForm from "./form"
import { Section } from "../../../../../shared"
import { FieldLabel } from "../../../../../shared"
import {
  GeneralObjectiveText
} from "../../general-information/development-objectives/form/general-objective-text"

export function GeneralObjective() {
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
          helpText={<GeneralObjectiveText />}>
          Objetivo general
        </FieldLabel>
      }>
      <GeneralObjectiveForm
        isLoading={loading}
        error={error}
        data={data}
        onChange={onChange} />
    </Section>
  )
}
