import { Tabs } from "antd"
import React from "react"
import "./style.sass"
import { CensusBeneficiaries } from "../tabs/beneficiaries"
import { CensusAssistants } from "../tabs/assistants"
import { withForm } from "../../../../helpers"

function CensusTabs() {
  return (
    <Tabs
      className="fico census"
      defaultActiveKey="1">
      <Tabs.TabPane tab="Beneficiarios" key="1">
        <CensusBeneficiaries />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Asistentes" key="2">
        <CensusAssistants />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default withForm(CensusTabs)
