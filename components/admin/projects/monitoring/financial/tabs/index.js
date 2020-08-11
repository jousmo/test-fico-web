import { Tabs } from "antd"
import { Expense } from "./expense"
import { SearchFieldPrimary } from "../../../../../shared"
import "./style.sass"

export function MonitoringFinancialTabs() {
  return (
    <Tabs defaultActiveKey="1" className="fico financial-monitoring">
      <Tabs.TabPane tab="Gastos" key="1">
        <Expense />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Resumen conceptos" key="2">
        <SearchFieldPrimary style={{margin: "0 1rem"}} />
      </Tabs.TabPane>
    </Tabs>
  )
}