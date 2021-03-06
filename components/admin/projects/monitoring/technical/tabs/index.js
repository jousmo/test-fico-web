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
import { MonitoringAssistance } from "./assistance"

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
      <Tabs.TabPane tab="Asistencias" key="3">
        <MonitoringAssistance data={data} dateFilter={filterState} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Objetivos y actividades" key="4">
        <MonitoringObjectives data={data} dateFilter={filterState} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Participantes" key="5">
        <MonitoringParticipants data={data} dateFilter={filterState} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Retos y obstáculos" key="6">
        <MonitoringObstacles data={data} dateFilter={filterState} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Cronograma" key="7">
        <MonitoringSchedule data={data} dateFilter={filterState}/>
      </Tabs.TabPane>
    </Tabs>
  )
}

export default withForm(TechnicalMonitoringTabs)
