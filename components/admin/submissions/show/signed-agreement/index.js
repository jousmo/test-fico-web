import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import SubmissionAgreement from "./documents"

export function SignedAgreement() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <Section title="Convenio firmado">
      <SubmissionAgreement
        data={data?.Submission}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
