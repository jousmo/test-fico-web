import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../contexts/implementer/submissions/new"
import BeneficiaryForm from "./form"

export function Beneficiaries() {
  const {
    updateGeneralInformation,
    loading,
    error,
    data
  } = useContext(ImplementerSubmissionContext)

  const onChange = data => {
    updateGeneralInformation({ beneficiaries: data })
  }

  return (
    <Section title="2. Proyectos de implementadora">
      <BeneficiaryForm
        data={data}
        isLoading={loading}
        error={error}
        onChange={onChange} />
    </Section>
  )
}
