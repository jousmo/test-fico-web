import { Section } from "../../../../shared"
import { useContext, useState } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import SubmissionAgreement from "./documents"

export function SignedAgreement() {
  const [ isSaveHidden, setIsSaveHidden] = useState(true)
  const {
    updateSubmissionDetail,
    save,
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  const onChange = newContractSignDate => {
    setIsSaveHidden(false)
    const newSubmission = {...data?.Submission}
    newSubmission.contractSignDate = newContractSignDate
    updateSubmissionDetail(newSubmission)
  }

  return (
    <Section title="Convenio firmado">
      <SubmissionAgreement
        data={data?.Submission}
        error={error}
        isLoading={loading}
        isSaveHidden={isSaveHidden}
        onChange={onChange}
        onSave={save}/>
    </Section>
  )
}
