import { Empty, Table } from "antd"
import { cellFormat } from "../../../../../../../../helpers"
import { ArrowsAltOutlined } from "@ant-design/icons"

export function ListSummaryComparative ({ onChange, dataSource }) {
  return (
    <Table
      onChange={onChange}
      className="summary-concepts"
      size="small"
      dataSource={dataSource}
      locale={{emptyText: <Empty description="Resumen de conceptos" />}}
      scroll={{ x: true }}
      pagination={false}>
      <Table.Column
        width={1}
        dataIndex="concept"
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
        dataIndex="2do"
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
        dataIndex="4to"
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
