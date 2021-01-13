import { ListCensus } from "../../list"
import React, { useState } from "react"
import { SearchFieldPrimary } from "../../../../shared"
import { decoratedCensusData } from "../../../../../helpers/assistantsBeneficiaries"
import { Button, Card, Space } from "antd"

export function CensusCard({ data, dateFilter, section }) {
  const [state, setState] = useState(undefined)
  const dataSource = decoratedCensusData(data, dateFilter)

  const onSearch = value => {
    if (!value) {
      setState(undefined)
      return
    }

    const filter = dataSource?.filter(assistant =>
      assistant.phone?.includes(value) ||
      assistant.name?.toLowerCase().includes(value.toLowerCase()) ||
      assistant.curp?.toLowerCase().includes(value.toLowerCase()) ||
      assistant.colony?.toLowerCase().includes(value.toLowerCase()) ||
      assistant.lastName?.toLowerCase().includes(value.toLowerCase()) ||
      assistant.maidenName?.toLowerCase().includes(value.toLowerCase()) ||
      assistant.problematic?.toLowerCase().includes(value.toLowerCase()) ||
      assistant.municipality?.toLowerCase().includes(value.toLowerCase())
    )
    setState(filter)
  }

  return (
    <Card>
      <SearchFieldPrimary onSearch={onSearch} />
      <Space size="middle">
        <Button type="primary">Descargar</Button>
      </Space>
      <ListCensus
        title={section}
        dataSource={state ? state : dataSource} />
    </Card>
  )
}
