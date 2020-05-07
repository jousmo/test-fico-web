import { Section } from "../../../../shared"
import { useContext, useState } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import SubmissionAgreementForm from "./form"

export function SignedAgreement() {
  const [ isSaveHidden, setIsSaveHidden] = useState(true)
  const {
    updateSubmissionDetail,
    save,
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  const onChange = newSignedContractAt => {
    setIsSaveHidden(false)
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
        isSaveHidden={isSaveHidden}
        onChange={onChange}
        onSave={save}/>
    </Section>
  )
}
