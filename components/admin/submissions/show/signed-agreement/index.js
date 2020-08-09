import { Section } from "../../../../shared"
import { useContext } from "react"
import { AdminSubmissionContext } from "../../../../../contexts/admin/submissions/show"
import SubmissionAgreementForm from "./form"

export function SignedAgreement() {
  const { data, save, updateSubmissionDetail, ...props } = useContext(AdminSubmissionContext)
  const { signedContractAt, agreementNumber } = data?.Submission || {}
  const hasSignedContract = !!(signedContractAt && agreementNumber)

  const onChange = ({ target: { name, value } }) => {
    updateSubmissionDetail({ [name]: value })
  }

  return (
    <Section title="Convenio firmado">
      <SubmissionAgreementForm
        data={data?.Submission}
        hasContract={!hasSignedContract}
        onChange={onChange}
        onSave={save}
        {...props}
      />
    </Section>
  )
}
