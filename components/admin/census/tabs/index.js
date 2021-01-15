import { DatePicker, Tabs } from "antd"
import React, { useState } from "react"
import "./style.sass"
import { CensusCard } from "./card"
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
        <CensusCard
          data={data?.beneficiaries}
          dateFilter={filterState}
          section="beneficiarios" />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Asistentes" key="2">
        <CensusCard
          data={data?.assistants}
          dateFilter={filterState}
          section="asistentes" />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default withForm(CensusTabs)
