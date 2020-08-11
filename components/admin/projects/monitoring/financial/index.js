import { PageHeader } from "../../../../shared"
import { MonitoringFinancialTabs } from "./tabs"

export function MonitoringFinancial() {
  return (
    <section>
      <PageHeader title="Monitoreo financiero" />
      <MonitoringFinancialTabs />
    </section>
  )
}