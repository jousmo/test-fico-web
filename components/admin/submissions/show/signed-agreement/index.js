import { Section } from "../../../../shared"
import { useContext } from "react"
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

  const onChange = newSignedContractAt => {
    const newSubmission = {
      ...data?.Submission,
      signedContractAt: newSignedContractAt
    }
    updateSubmissionDetail(newSubmission)
  }

  return (
    <Section title="Convenio firmado">
      <SubmissionAgreementForm
        data={data?.Submission}
        error={error}
        isLoading={loading}
        onChange={onChange}
        onSave={save} />
    </Section>
  )
}
