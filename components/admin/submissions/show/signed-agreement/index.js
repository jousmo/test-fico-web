import { Section } from "../../../../shared"
import { useContext, useState } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import SubmissionAgreementForm from "./form"

export function SignedAgreement() {
  const {
    updateSubmissionDetail,
    save,
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  const [state, setState] = useState({
    hasSignedContract: data?.Submission?.signedContractAt
  })

  const onChange = newSignedContractAt => {
    updateSubmissionDetail({ signedContractAt: newSignedContractAt })
    setState({ hasSignedContract: newSignedContractAt })
  }

  return (
    <Section title="Convenio firmado">
      <SubmissionAgreementForm
        data={data?.Submission}
        error={error}
        isLoading={loading}
        hasContract={state.hasSignedContract}
        onChange={onChange}
        onSave={save} />
    </Section>
  )
}
