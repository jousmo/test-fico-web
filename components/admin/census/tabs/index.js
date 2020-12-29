import { Tabs } from "antd"
import React from "react"
import "./style.sass"
import { CensusBeneficiaries } from "../tabs/beneficiaries"
import { CensusAssistants } from "../tabs/assistants"
import { withForm } from "../../../../helpers"

function CensusTabs({ data }) {
  return (
    <Tabs
      className="fico census"
      defaultActiveKey="1">
      <Tabs.TabPane tab="Beneficiarios" key="1">
        <CensusBeneficiaries data={data?.beneficiaries}/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Asistentes" key="2">
        <CensusAssistants data={data?.assistants}/>
      </Tabs.TabPane>
    </Tabs>
  )
}

export default withForm(CensusTabs)
