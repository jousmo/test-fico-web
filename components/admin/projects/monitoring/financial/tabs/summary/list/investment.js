import { Empty, Table } from "antd"
import { cellFormat } from "../../../../../../../../helpers"

export function ListSummaryInvestment ({ dataSource }) {
  return (
    <Table
      dataSource={dataSource}
      size="small"
      locale={{emptyText: <Empty description="Resumen de inversión" />}}
      pagination={false}>
      <Table.Column
        width={1}
        dataIndex="concept"
        title="Concepto" />
      <Table.Column
        width={1}
        dataIndex="budgeted"
        title="Presupuesto"
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="amount"
        title="Ejercido"
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="ficosecPayment"
        title="Ficosec"
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="implementerPayment"
        title="Implementadora"
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="investmentOnePayment"
        title="Coinversionista 1"
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="investmentTwoPayment"
        title="Coinversionista 2"
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="diference"
        title="remanente"
        render={text => cellFormat.money(text)} />
    </Table>
  )
}
