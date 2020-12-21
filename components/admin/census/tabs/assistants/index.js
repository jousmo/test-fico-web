import { ListCensus } from "../../list"
import React, { useContext } from "react"
import { SearchFieldPrimary } from "../../../../shared"
import { AdminSubmissionContext } from "../../../../../contexts/admin/submissions/show"
import { decoratedData } from "../../../../../helpers/assistantsBeneficiaries"
import { Button, Card, Space } from "antd"

export function CensusAssistants() {
  const { data } = useContext(AdminSubmissionContext)
  const dataSource = decoratedData(data?.assistants)

  return (
    <Card className="assistants">
      <SearchFieldPrimary onSearch={null} />
      <Space size="middle" style={{margin: "1rem 0", float: "right" }}>
        <Button type="primary">Descargar</Button>
      </Space>
      <ListCensus title="asistentes" dataSource={dataSource}/>
    </Card>
  )
}
