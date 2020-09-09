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
    review,
    error,
    data,
    hiddenComments
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
        review={review}
        onChange={onChange}
        hiddenComments={hiddenComments} />
    </Section>
  )
}
