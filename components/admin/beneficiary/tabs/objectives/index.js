import React from "react"
import { Card, Empty, Table } from "antd"
import { decoratedCensusBeneficiary } from "../../../../../helpers/assistantsBeneficiaries"

export function CensusBeneficiaryObjectives({ data }) {
  const dataSource = decoratedCensusBeneficiary(data)
  return (
    <Card>
      <Table
        rowKey={a => a.id}
        style={{marginTop: "1.5rem"}}
        dataSource={dataSource}
        size="small"
        locale={{emptyText: <Empty description={"No hay objetivos específicos"} />}}
        pagination={true}>
        <Table.Column
          width={1}
          dataIndex="name"
          title="Objetivo especifico" />
        <Table.Column
          width={1}
          dataIndex="strategicAxis"
          title="Eje" />
        <Table.Column
          width={1}
          dataIndex="issueDescription"
          title="Problemática" />
        <Table.Column
          width={1}
          dataIndex="date"
          title="Fecha" />
      </Table>
    </Card>
  )
}
