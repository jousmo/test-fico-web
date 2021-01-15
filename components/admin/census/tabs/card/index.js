import { ListCensus } from "../../list"
import React, { useState } from "react"
import { SearchFieldPrimary } from "../../../../shared"
import { decoratedCensusData } from "../../../../../helpers/assistantsBeneficiaries"
import { Button, Card, Space } from "antd"
import { onSearch, censusExport } from "./helpers"

export function CensusCard({ data, dateFilter, section }) {
  const [state, setState] = useState(undefined)
  const dataSource = decoratedCensusData(data, dateFilter)

  return (
    <Card>
      <SearchFieldPrimary onSearch={value => onSearch(dataSource, setState, value)} />
      <Space size="middle">
        <Button type="primary" onClick={() => censusExport(dataSource, section)}>Descargar</Button>
      </Space>
      <ListCensus
        title={section}
        dataSource={state ? state : dataSource} />
    </Card>
  )
}
