import { PageHeader } from "../../../../shared"
import MonitoringFinancialTabs from "./tabs"
import { useContext } from "react"
import { AdminSubmissionContext } from "../../../../../contexts/admin/submissions/show"

export function MonitoringFinancial() {
  const { loading, error, data } = useContext(AdminSubmissionContext)

  return (
    <section>
      <PageHeader title="Monitoreo financiero" />
      <MonitoringFinancialTabs
        data={data?.Submission}
        error={error}
        isLoading={loading} />
    </section>
  )
}
