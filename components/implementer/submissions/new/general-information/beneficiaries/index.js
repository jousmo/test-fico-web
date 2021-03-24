import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import BeneficiaryForm from "./form"
import { Section } from "../../../../../shared"

export function Beneficiaries() {
  const {
    updateGeneralInformation,
    readOnly,
    loading,
    review,
    error,
    data,
    hiddenComments
  } = useContext(ImplementerSubmissionContext)

  const onChange = data => {
    updateGeneralInformation(data)
  }

  return (
    <Section title="4. Beneficiarios">
      <BeneficiaryForm
        data={data?.GeneralInformation}
        review={review}
        readOnly={readOnly}
        isLoading={loading}
        error={error}
        onChange={onChange}
        hiddenComments={hiddenComments} />
    </Section>
  )
}
