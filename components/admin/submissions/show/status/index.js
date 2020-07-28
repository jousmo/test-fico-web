import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import StatusForm from "./form"

export function Status() {
  const {
    updateSubmissionDetail,
    save,
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  const onChange = newDeadline => {
    updateSubmissionDetail({ deadline: newDeadline })
  }

  return (
    <Section title="Estatus de solicitud">
      <StatusForm
        data={data?.Submission}
        error={error}
        isLoading={loading}
        onChange={onChange}
        onSave={save} />
    </Section>
  )
}
