import { Tabs } from "antd"
import { useState } from "react"
import { withForm } from "../../../../../../helpers"
import { MonitoringObjectives } from "./objectives"
import { DateField } from "../../../../../shared"
import "./style.sass"

function TechnicalMonitoringTabs({ data }) {
  const [filterState, setFilterState] = useState([])

  const onFilterChange = ({ currentTarget }) => {
    const { value } = currentTarget
    setFilterState(value)
  }

  return (
    <Tabs
      defaultActiveKey="1"
      className="fico technical-monitoring"
      tabBarExtraContent={
        <DateField
          onChange={onFilterChange}
          range />
      }>
      <Tabs.TabPane tab="Objetivos y actividades" key="1">
        <MonitoringObjectives data={data} dateFilter={filterState} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Retos y obstáculos" key="2">

      </Tabs.TabPane>
      <Tabs.TabPane tab="Participantes" key="3">

      </Tabs.TabPane>
    </Tabs>
  )
}

export default withForm(TechnicalMonitoringTabs)
