import { PageHeader } from "../../../../shared"
import { MonitoringFinancialTabs } from "./tabs"

export function MonitoringFinancial() {
  return (
    <section className="monitoring-finacial">
      <PageHeader title="Monitoreo financiero"/>
      <MonitoringFinancialTabs />
    </section>
  )
}