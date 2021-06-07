import { Tabs } from "antd"
import { Expense } from "./expense"
import { SummaryConcept } from "./summary"
import { BankStatements } from "./statements"
import { FinancialSchedule } from "./schedule"
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
      <Tabs.TabPane tab="Estados de cuenta" key="3">
        <BankStatements />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Cronograma" key="4">
        <FinancialSchedule />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default withForm(MonitoringFinancialTabs)
