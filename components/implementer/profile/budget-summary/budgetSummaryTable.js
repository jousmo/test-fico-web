import { Empty, Table } from "antd"
import { withForm } from "../../../../helpers/withForm"
import * as cellFormat from "../../../../helpers/cellFormat"

function BudgetSummaryTable({ data }) {
  return (
    <>
      <Table
        pagination={false}
        locale={{emptyText: <Empty description="Agrega proyectos en la sección anterior para generar el resumen" />}}>
        <Table.Column
          title="Año"
          key="year"
          dataIndex="year" />
        <Table.Column
          title="Presupuesto público"
          key="publicBudget"
          dataIndex="publicBudget" />
        <Table.Column
          title="Presupuesto propio"
          key="ownBudget"
          dataIndex="ownBudget" />
        <Table.Column
          title="Presupuesto privado"
          key="privateBudget"
          dataIndex="privateBudget" />
        <Table.Column
          title="Total"
          key="total"
          dataIndex="total"
          render={cellFormat.money} />
      </Table>
      (%) Porcentaje de financiamiento del total anual
    </>
  )
}

export default withForm(BudgetSummaryTable)
