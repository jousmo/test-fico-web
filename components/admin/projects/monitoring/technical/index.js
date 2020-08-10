import { PageHeader } from "../../../../shared/page-header"
import { TechnicalMonitoringTabs } from "./tabs"

export function TechnicalMonitoring() {
  return (
    <section>
      <PageHeader title="Monitoreo técnico" />
      <TechnicalMonitoringTabs />
    </section>
  )
}
