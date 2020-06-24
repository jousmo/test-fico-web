import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import MonitoringList from "./list"

export function ProjectMonitoring() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <Section title="Monitoreo de proyecto">
      <MonitoringList
        data={data?.Submission}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
