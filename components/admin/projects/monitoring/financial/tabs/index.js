import { Tabs } from "antd"
import { Expense } from "./expense"
import { SummaryConcept } from "./summary"
import { withForm } from "../../../../../../helpers"
import "./style.sass"

function MonitoringFinancialTabs() {
  return (
    <Tabs defaultActiveKey="1" className="fico financial-monitoring">
      <Tabs.TabPane tab="Gastos" key="1">
        <Expense />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Resumen conceptos" key="2">
        <SummaryConcept />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default withForm(MonitoringFinancialTabs)