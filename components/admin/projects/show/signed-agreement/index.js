import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import ProjectAgreementForm from "./form"

export function SignedAgreement() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <Section title="Convenio firmado">
      <ProjectAgreementForm
        data={data?.Submission}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
