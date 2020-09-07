import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import BeneficiaryForm from "./form"
import { Section } from "../../../../../shared"

export function Beneficiaries() {
  const {
    updateGeneralInformation,
    loading,
    review,
    error,
    data,
    hiddenComments
  } = useContext(ImplementerSubmissionContext)

  const onChange = data => {
    updateGeneralInformation({ beneficiaries: data })
  }

  return (
    <Section title="4. Beneficiarios">
      <BeneficiaryForm
        data={data}
        review={review}
        isLoading={loading}
        error={error}
        onChange={onChange}
        hiddenComments={hiddenComments} />
    </Section>
  )
}
