import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import ProjectClosureForm from "./form"

export function ProjectClosure() {
  const {
    readOnly,
    loading,
    error,
    data,
    save
  } = useContext(AdminSubmissionContext)

  return (
    <Section title="Cierre de proyecto">
      <ProjectClosureForm
        data={data?.Submission}
        error={error}
        save={save}
        disabled={readOnly}
        isLoading={loading} />
    </Section>
  )
}
