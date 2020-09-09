import { Empty, Table } from "antd"
import { cellFormat } from "../../../../../../../../helpers"
import { ArrowsAltOutlined } from "@ant-design/icons"
import moment from "moment"
moment.locale("es")

export function ListSummaryConcept ({ onChange, dataSource }) {
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
        dataIndex="enero"
        title={<><ArrowsAltOutlined /> Ene</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="febrero"
        title={<><ArrowsAltOutlined /> Feb</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="marzo"
        title={<><ArrowsAltOutlined /> Mar</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="abril"
        title={<><ArrowsAltOutlined /> Abr</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="mayo"
        title={<><ArrowsAltOutlined /> May</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="junio"
        title={<><ArrowsAltOutlined /> Jun</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="julio"
        title={<><ArrowsAltOutlined /> Jul</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="agosto"
        title={<><ArrowsAltOutlined /> Ago</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="septiembre"
        title={<><ArrowsAltOutlined /> Sep</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="octubre"
        title={<><ArrowsAltOutlined /> Oct</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="noviembre"
        title={<><ArrowsAltOutlined /> Nov</>}
        render={text => cellFormat.money(text)}
        sorter
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="diciembre"
        title={<><ArrowsAltOutlined /> Dic</>}
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
