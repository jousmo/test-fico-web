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
    readOnly,
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
          helpText={<GeneralObjectiveText />}>
          Objetivo general
        </FieldLabel>
      }>
      <GeneralObjectiveForm
        isLoading={loading}
        readOnly={readOnly}
        error={error}
        data={data}
        review={review}
        onChange={onChange}
        hiddenComments={hiddenComments} />
    </Section>
  )
}
