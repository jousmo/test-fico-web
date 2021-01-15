import { useContext, useState } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import { Section, VisibilityRadio } from "../../../../../shared"
import ConsultantForm from "./form"

export function Consultant() {
  const [state, setState] = useState(true)

  const {
    updateGeneralInformation,
    review,
    loading,
    error,
    data,
    hiddenComments
  } = useContext(ImplementerSubmissionContext)

  const onChange = data => {
    updateGeneralInformation({ consultants: data })
  }

  const onVisibilityChange = value => {
    setState(value)
    if (!value) {
      onChange([])
    }
  }

  return (
    <Section title="2. Consultores">
      <VisibilityRadio
        label="¿El proyecto cuenta con consultores?"
        visible={state}
        onChange={onVisibilityChange}>
        <ConsultantForm
          isLoading={loading}
          error={error}
          data={data}
          review={review}
          onChange={onChange}
          hiddenComments={hiddenComments} />
      </VisibilityRadio>
    </Section>
  )
}
