import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import StatusForm from "./form"

export function Status() {
  const {
    loading,
    error,
    save,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <Section title="Estatus de solicitud">
      <StatusForm
        data={data?.SubmissionDetails}
        error={error}
        isLoading={loading}
        onSave={save} />
    </Section>
  )
}
