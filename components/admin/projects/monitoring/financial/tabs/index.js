import { Tabs } from "antd"
import Expense from "./expense"
import { SearchFieldPrimary } from "../../../../../shared"
import "./style.sass"
import { useContext } from "react"
import { AdminSubmissionContext } from "../../../../../../contexts/admin/submissions/show"

export function MonitoringFinancialTabs() {
  const {
    loading,
    error,
    data,
    save
  } = useContext(AdminSubmissionContext)

  return (
    <Tabs defaultActiveKey="1" className="fico financial-monitoring">
      <Tabs.TabPane tab="Gastos" key="1">
        <Expense
          data={data?.Submission}
          error={error}
          isLoading={loading}
          save={save} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Resumen conceptos" key="2">
        <SearchFieldPrimary style={{margin: "0 1rem"}} />
      </Tabs.TabPane>
    </Tabs>
  )
}