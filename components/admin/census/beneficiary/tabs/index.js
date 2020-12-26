import { Tabs } from "antd"
import React from "react"
import "../style.sass"
import { CensusBeneficiaryInfo } from "./general"
import { CensusBeneficiaryProjects } from "./projects"

export function CensusBeneficiaryTabs({ data }) {
  return (
    <Tabs
      className="fico census"
      defaultActiveKey="1">
      <Tabs.TabPane tab="Información" key="1">
        <CensusBeneficiaryInfo data={data} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Proyectos" key="2">
        <CensusBeneficiaryProjects data={data?.submission} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Actividad" key="3">
        <h1>Actividad</h1>
      </Tabs.TabPane>
    </Tabs>
  )
}
