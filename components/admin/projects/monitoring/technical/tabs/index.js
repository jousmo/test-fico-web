import { DatePicker, Tabs } from "antd"
import React, { useState } from "react"
import { withForm } from "../../../../../../helpers"
import { MonitoringObjectives } from "./objectives"
import { MonitoringParticipants } from "./participants"
import { MonitoringObstacles } from "./obstacles"
import { MonitoringSchedule } from "./schedule"
import "./style.sass"
import { MonitoringAssistants } from "./assistants"
import { MonitoringBeneficiaries } from "./beneficiaries"

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
          format="DD/MM/YYYY"
          onChange={onFilterChange} />
      }>
      <Tabs.TabPane tab="Asistentes" key="1">
        <MonitoringAssistants data={data} dateFilter={filterState} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Beneficiarios" key="2">
        <MonitoringBeneficiaries data={data} dateFilter={filterState} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Objetivos y actividades" key="3">
        <MonitoringObjectives data={data} dateFilter={filterState} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Participantes" key="4">
        <MonitoringParticipants data={data} dateFilter={filterState} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Retos y obstáculos" key="5">
        <MonitoringObstacles data={data} dateFilter={filterState} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Cronograma" key="6">
        <MonitoringSchedule data={data} dateFilter={filterState}/>
      </Tabs.TabPane>
    </Tabs>
  )
}

export default withForm(TechnicalMonitoringTabs)
