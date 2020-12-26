import { Tabs } from "antd"
import React from "react"
import "../../tabs/style.sass"
import { withForm } from "../../../../../helpers"
import { CensusBeneficiaryInfo } from "./general"

function CensusBeneficiaryTabs({ data }) {
  return (
    <Tabs
      className="fico census"
      defaultActiveKey="1">
      <Tabs.TabPane tab="Información" key="1">
        <CensusBeneficiaryInfo data={data} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Proyectos" key="2">
        <h1>Proyectos</h1>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Actividad" key="3">
        <h1>Actividad</h1>
      </Tabs.TabPane>
    </Tabs>
  )
}

export default withForm(CensusBeneficiaryTabs)
