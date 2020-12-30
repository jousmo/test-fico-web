import { Tabs } from "antd"
import React from "react"
import { CensusAssistantInfo } from "./general"
import { CensusAssistantProjects } from "./projects"
import { CensusAssistantObjectives } from "./objectives"
import "../style.sass"

export function CensusAssistantTabs({ data }) {
  return (
    <Tabs
      className="fico census"
      defaultActiveKey="1">
      <Tabs.TabPane tab="Información" key="1">
        <CensusAssistantInfo data={data} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Proyectos" key="2">
        <CensusAssistantProjects data={data?.submission} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Objetivos específicos" key="3">
        <CensusAssistantObjectives data={data?.submission} />
      </Tabs.TabPane>
    </Tabs>
  )
}
