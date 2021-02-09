import { Section } from "../../../../shared"
import { useContext } from "react"
import { AdminSubmissionContext } from "../../../../../contexts/admin/submissions/show"
import SubmissionAgreementForm from "./form"

export function SignedAgreement() {
  const { data, save, ...props } = useContext(AdminSubmissionContext)
  const { signedContractAt, agreementNumber } = data?.Submission || {}
  const hasSignedContract = !!(signedContractAt && agreementNumber)

  return (
    <Section title="Convenio firmado">
      <SubmissionAgreementForm
        data={data?.Submission}
        hasContract={!hasSignedContract}
        onSave={save}
        {...props}
      />
    </Section>
  )
}
