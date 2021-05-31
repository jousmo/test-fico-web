import React, { useState } from "react"
import { Card, Select, Space } from "antd"
import { SearchFieldPrimary } from "../../../../../../shared"
import { AssistanceList } from "./list"
import { AssistanceModal } from "./modal"
import { assistanceDecorator } from "./helpers"

export function MonitoringAssistance({ data, dateFilter }) {
  const { Submission: { assistants } } = data || {}
  const decoratedData = assistanceDecorator(assistants, dateFilter)
  const activities = Object.keys(decoratedData)

  const [activity, setActivity] = useState(activities[0])
  const [search, setSearch] = useState(undefined)
  const [assistance, setAssistance] = useState({
    isModalVisible: false,
    value: undefined
  })

  const onEdit = value => {
    setAssistance({ isModalVisible: true, value })
  }

  const onCancel = () => {
    setAssistance({ isModalVisible: false, value: undefined })
  }

  return (
    <>
      <SearchFieldPrimary
        onSearch={value => setSearch(value)}
        style={{ marginBottom: "1rem" }}  />
      <Card className="assistance">
        <Space size="middle">
          <Select
            defaultValue={decoratedData[activities[0]]?.name}
            notFoundContent="No hay actividades"
            onChange={value => setActivity(value)}
            placeholder="Selecciona una actividad"
            style={{ width: "15rem" }}>
            {activities.map(key =>
              <Select.Option key={key} value={key}>{decoratedData[key].name}</Select.Option>
            )}
          </Select>
        </Space>
        <AssistanceList
          activity={activity}
          dataSource={decoratedData}
          onEdit={onEdit}
          search={search} />
        <AssistanceModal
          assistance={assistance.value}
          onCancel={onCancel}
          visible={assistance.isModalVisible} />
      </Card>
    </>
  )
}
