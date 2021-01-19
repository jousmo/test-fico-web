import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import ProjectClosureForm from "./form"

export function ProjectClosure() {
  const {
    loading,
    error,
    data,
    save
  } = useContext(AdminSubmissionContext)

  return (
    <Section title="Cierre de proyecto">
      <ProjectClosureForm
        data={data?.SubmissionDetails}
        error={error}
        save={save}
        isLoading={loading} />
    </Section>
  )
}
