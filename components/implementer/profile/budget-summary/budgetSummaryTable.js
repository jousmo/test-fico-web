import { Alert, Empty, Table, Skeleton } from "antd"
import * as cellFormat from "../../../../helpers/cellFormat"

export function BudgetSummaryTable({data, error, isLoading}) {
  if(isLoading) {
    return <Skeleton active />
  }

  if(!data || error) {
    return (
      <Alert
        message="Error"
        description="Ha ocurrido un error al cargar los datos de esta sección,
        por favor actualiza la página."
        type="error"
        showIcon />
    )
  }

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
