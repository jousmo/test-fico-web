import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import SubmissionAttachments from "./documents"

export function Attachments() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <Section title="Anexos">
      <SubmissionAttachments
        data={data?.Submission}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
