import { Empty, Table } from "antd"
import { withForm } from "../../../../../helpers/withForm"
import { money } from "../../../../../helpers/valueFormat"
import * as cellFormat from "../../../../../helpers/cellFormat"
import { decoratedData } from "./data-decorator"

function BudgetSummaryTable({ data }) {
  const dataSource = decoratedData(data)

  const getValue = (row, type) => {
    const amount = row[type]
    const total = amount !== 0 ? row.total : 1

    const percentage = ((amount * 100) / total).toFixed(2)
    return `${money(amount)} (${percentage}%)`
  }

  return (
    <>
      <Table
        dataSource={dataSource}
        pagination={false}
        locale={{emptyText: <Empty description="Agrega proyectos en la sección anterior para generar el resumen" />}}>
        <Table.Column
          title="Año"
          key="year"
          dataIndex="year" />
        <Table.Column
          title="Presupuesto público"
          dataIndex="PUBLIC"
          render={(t, row) => getValue(row, "PUBLIC")} />
        <Table.Column
          title="Presupuesto propio"
          dataIndex="OWN"
          render={(t, row) => getValue(row, "OWN")} />
        <Table.Column
          title="Presupuesto privado"
          dataIndex="PRIVATE"
          render={(t, row) => getValue(row, "PRIVATE")} />
        <Table.Column
          title="Total"
          dataIndex="total"
          render={cellFormat.money} />
      </Table>
      (%) Porcentaje de financiamiento del total anual
    </>
  )
}

export default withForm(BudgetSummaryTable)
