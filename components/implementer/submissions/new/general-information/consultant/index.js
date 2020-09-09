import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import { Section } from "../../../../../shared"
import ConsultantForm from "./form"

export function Consultant() {
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

  return (
    <Section title="2. Consultores">
      <ConsultantForm
        isLoading={loading}
        error={error}
        data={data}
        review={review}
        onChange={onChange}
        hiddenComments={hiddenComments} />
    </Section>
  )
}
