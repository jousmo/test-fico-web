import { DatePicker, Tabs } from "antd"
import React, { useState } from "react"
import "./style.sass"
import { CensusBeneficiaries } from "./beneficiaries"
import { CensusAssistants } from "./assistants"
import { withForm } from "../../../../helpers"

function CensusTabs({ data }) {
  const [filterState, setFilterState] = useState([])

  const onFilterChange = value => {
    value = value && value?.map(v => v.format("YYYYMMDD"))
    setFilterState(value)
  }

  return (
    <Tabs
      className="fico census"
      defaultActiveKey="1"
      tabBarExtraContent={
        <DatePicker.RangePicker
          format="DD/MM/YYYY"
          onChange={onFilterChange} />
      }>
      <Tabs.TabPane tab="Beneficiarios" key="1">
        <CensusBeneficiaries data={data?.beneficiaries} dateFilter={filterState} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Asistentes" key="2">
        <CensusAssistants data={data?.assistants} dateFilter={filterState} />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default withForm(CensusTabs)
