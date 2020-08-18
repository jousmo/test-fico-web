import { Empty, Table } from "antd"
import { cellFormat } from "../../../../../../../../helpers"
import { ArrowsAltOutlined } from "@ant-design/icons"

export function ListSummaryConcept () {
  const dataSource = [
    {
      key: "1",
      concepto: "Telefono/Internet",
      ene: 1368,
      feb: 1368,
      mar: 1368,
      abr: 1368,
      may: 1368,
      jun: 1368,
      jul: 1368,
      ago: 1368,
      sep: 1368,
      oct: 1368,
      nov: 1368,
      dic: 1368,
      total: 1368
    }
  ]
  return (
    <Table
      className="summary-concepts"
      size="small"
      dataSource={dataSource}
      locale={{emptyText: <Empty description="Resumen de conceptos" />}}
      pagination={false}>
      <Table.Column
        width={1}
        dataIndex="concepto"
        title="Concepto" />
      <Table.Column
        width={1}
        dataIndex="ene"
        title={<><ArrowsAltOutlined /> Ene</>}
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="feb"
        title={<><ArrowsAltOutlined /> Feb</>}
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="mar"
        title={<><ArrowsAltOutlined /> Mar</>}
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="abr"
        title={<><ArrowsAltOutlined /> Abr</>}
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="may"
        title={<><ArrowsAltOutlined /> May</>}
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="jun"
        title={<><ArrowsAltOutlined /> Jun</>}
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="jul"
        title={<><ArrowsAltOutlined /> Jul</>}
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="ago"
        title={<><ArrowsAltOutlined /> Ago</>}
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="sep"
        title={<><ArrowsAltOutlined /> Sep</>}
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="oct"
        title={<><ArrowsAltOutlined /> Oct</>}
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="nov"
        title={<><ArrowsAltOutlined /> Nov</>}
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="dic"
        title={<><ArrowsAltOutlined /> Dic</>}
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={1}
        dataIndex="total"
        title={<><ArrowsAltOutlined /> Total</>}
        render={text => cellFormat.money(text)} />
    </Table>
  )
}