import { Tabs } from "antd"
import React from "react"
import { CensusBeneficiaryInfo } from "./general"
import { CensusBeneficiaryProjects } from "./projects"
import { CensusBeneficiaryObjectives } from "./objectives"
import "../style.sass"

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
      <Tabs.TabPane tab="Objetivos específicos" key="3">
        <CensusBeneficiaryObjectives data={data?.submission} />
      </Tabs.TabPane>
    </Tabs>
  )
}
