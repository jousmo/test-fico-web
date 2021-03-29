import React from "react"
import { Table, Empty } from "antd"
import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons"
import Moment from "moment"

export function AssistanceList ({ activity, dataSource }) {
  const columns = Array.from(dataSource[activity]?.columns || [])
  const rows = Object.values(dataSource[activity]?.participants || {})

  const iconStyle = { fontSize: "20px" }
  return (
    <Table
      rowKey={({ assistantId }) => assistantId}
      style={{ marginTop: "1.5rem" }}
      dataSource={rows}
      size="small"
      locale={{ emptyText: <Empty description="No hay asistencias registradas" /> }}
      scroll={{ x: true }}
      pagination={true}>
      <Table.Column
        dataIndex="fullName"
        sorter={(a, b) => a.fullName.localeCompare(b.fullName)}
        showSorterTooltip={false}
        title="Asistente" />
      {columns.map(column =>
        <Table.Column
          align="center"
          key={column}
          render={row =>
            row.dates.includes(column) ?
              <CheckCircleTwoTone twoToneColor="#52c41a" style={iconStyle} /> :
              <CloseCircleOutlined style={iconStyle} />
          }
          title={Moment(column).format("DD/MM/YYYY HH:mm")} />
      )}
    </Table>
  )
}

