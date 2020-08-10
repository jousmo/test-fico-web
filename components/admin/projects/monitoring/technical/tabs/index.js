import { Tabs } from "antd"
import { MonitoringObjectives } from "./objectives"
import "./style.sass"

export function TechnicalMonitoringTabs() {
  return (
    <Tabs defaultActiveKey="1" className="fico technical-monitoring">
      <Tabs.TabPane tab="Objetivos y actividades" key="1">
        <MonitoringObjectives />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Retos y obstáculos" key="2">

      </Tabs.TabPane>
      <Tabs.TabPane tab="Participantes" key="3">

      </Tabs.TabPane>
    </Tabs>
  )
}
