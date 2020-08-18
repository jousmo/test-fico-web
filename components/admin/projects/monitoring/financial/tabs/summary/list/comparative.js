import { Empty, Table } from "antd"
import { cellFormat } from "../../../../../../../../helpers"
import { ArrowsAltOutlined } from "@ant-design/icons"

export function ListSummaryComparative ({ onChange }) {
  const dataSource = [
    {
      key: "1",
      concepto: "Telefono/Internet",
      "1er": 1368,
      "2er": 1368,
      "3er": 1368,
      "4er": 1368,
      total: 1368
    }
  ]
  return (
    <Table
      onChange={onChange}
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
        dataIndex="1er"
        title={<><ArrowsAltOutlined /> 1er</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="2er"
        title={<><ArrowsAltOutlined /> 2er</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="3er"
        title={<><ArrowsAltOutlined /> 3er</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="4er"
        title={<><ArrowsAltOutlined /> 4er</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="total"
        title={<><ArrowsAltOutlined /> Total</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
    </Table>
  )
}