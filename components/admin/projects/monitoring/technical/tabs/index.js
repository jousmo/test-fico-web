import { DatePicker, Tabs } from "antd"
import { useState } from "react"
import { withForm } from "../../../../../../helpers"
import { MonitoringObjectives } from "./objectives"
import { MonitoringParticipants } from "./participants"
import { MonitoringObstacles } from "./obstacles"
import { MonitoringSchedule } from "./schedule"
import "./style.sass"

function TechnicalMonitoringTabs({ data }) {
  const [filterState, setFilterState] = useState([])

  const onFilterChange = value => {
    value = value && value?.map(v => v.format("YYYYMMDD"))
    setFilterState(value)
  }

  return (
    <Tabs
      defaultActiveKey="1"
      className="fico technical-monitoring"
      tabBarExtraContent={
        <DatePicker.RangePicker
          onChange={onFilterChange} />
      }>
      <Tabs.TabPane tab="Objetivos y actividades" key="1">
        <MonitoringObjectives data={data} dateFilter={filterState} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Retos y obstáculos" key="2">
        <MonitoringObstacles data={data} dateFilter={filterState} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Participantes" key="3">
        <MonitoringParticipants data={data} dateFilter={filterState} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Cronograma" key="4">
        <MonitoringSchedule data={data} dateFilter={filterState}/>
      </Tabs.TabPane>
    </Tabs>
  )
}

export default withForm(TechnicalMonitoringTabs)
