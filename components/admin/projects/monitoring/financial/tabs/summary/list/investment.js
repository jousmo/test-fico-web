import { Empty, Table } from "antd"
import { cellFormat } from "../../../../../../../../helpers"

export function ListSummaryInvestment () {
  const dataSource = [
    {
      key: "1",
      concepto: "Telefono/Internet",
      presupuesto: 1368,
      ejercido: 1368,
      ficosec: 1368,
      implementadora: 1368,
      coinversionista1: 1368,
      coinversionista2: 1368,
      remanente: 1368
    }
  ]
  return (
    <Table
      dataSource={dataSource}
      size="small"
      locale={{emptyText: <Empty description="Resumen de inversión" />}}
      pagination={false}>
      <Table.Column
        width={1}
        dataIndex="concepto"
        title="Concepto" />
      <Table.Column
        width={1}
        dataIndex="presupuesto"
        title="Presupuesto"
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="ejercido"
        title="Ejercido"
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="ficosec"
        title="Ficosec"
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="implementadora"
        title="Implementadora"
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="coinversionista1"
        title="Coinversionista 1"
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="coinversionista2"
        title="Coinversionista 2"
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="remanente"
        title="remanente"
        render={text => cellFormat.money(text)} />
    </Table>
  )
}