import React, { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { PageHeader } from "../../../../shared"
import TechnicalMonitoringTabs from "./tabs"

export function TechnicalMonitoring() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <section>
      <PageHeader title="Monitoreo técnico" />
      <TechnicalMonitoringTabs
        data={data}
        error={error}
        isLoading={loading} />
    </section>
  )
}
