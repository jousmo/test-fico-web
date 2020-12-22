import { ListCensus } from "../../list"
import React from "react"
import { SearchFieldPrimary } from "../../../../shared"
import { decoratedCensusData } from "../../../../../helpers/assistantsBeneficiaries"
import { Button, Card, Space } from "antd"

export function CensusAssistants({ data }) {
  const dataSource = decoratedCensusData(data)

  return (
    <Card className="assistants">
      <SearchFieldPrimary onSearch={null} />
      <Space size="middle" style={{margin: "1rem 0", float: "right" }}>
        <Button type="primary">Descargar</Button>
      </Space>
      <ListCensus title="asistentes" dataSource={dataSource} />
    </Card>
  )
}
