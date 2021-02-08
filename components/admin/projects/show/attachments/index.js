import { Section } from "../../../../shared"
import ProjectAttachments from "./documents"
import { useContext } from "react"
import { AdminSubmissionContext } from "../../../../../contexts/admin/submissions/show"

export function Attachments() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <Section title="Documentos del proyecto">
      <ProjectAttachments
        data={data?.Submission}
        error={error}
        isLoading={loading}
      />
    </Section>
  )
}
