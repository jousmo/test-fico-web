import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import StatusBody from "./body"

export function Status() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <Section title="Estatus de solicitud">
      <StatusBody
        data={data?.Submission}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
