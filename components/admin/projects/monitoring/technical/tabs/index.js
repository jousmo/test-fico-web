import { Tabs } from "antd"
import { withForm } from "../../../../../../helpers"
import { MonitoringObjectives } from "./objectives"
import "./style.sass"

function TechnicalMonitoringTabs({ data }) {
  return (
    <Tabs defaultActiveKey="1" className="fico technical-monitoring">
      <Tabs.TabPane tab="Objetivos y actividades" key="1">
        <MonitoringObjectives data={data} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Retos y obstáculos" key="2">

      </Tabs.TabPane>
      <Tabs.TabPane tab="Participantes" key="3">

      </Tabs.TabPane>
    </Tabs>
  )
}

export default withForm(TechnicalMonitoringTabs)
