import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import MonitoringList from "./list"

export function ProjectMonitoring() {
  const {
    router
  } = useContext(AdminSubmissionContext)

  return (
    <Section title="Monitoreo de proyecto">
      <MonitoringList router={router} />
    </Section>
  )
}
