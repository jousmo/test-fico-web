import { Empty, Table } from "antd"
import { cellFormat } from "../../../../../../../../helpers"
import { ArrowsAltOutlined } from "@ant-design/icons"
import { useContext } from "react"
import { AdminSubmissionContext } from "../../../../../../../../contexts/admin/submissions/show"
import { getConcept } from "../../../helpers"
import Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
moment.locale("es")

export function ListSummaryConcept ({ onChange }) {
  const { data: { Submission } } = useContext(AdminSubmissionContext)

  const concepts = _.intersection(Submission?.invoices.map(invoice => invoice.concept))

  const dataSource = concepts.map(concept => {
    const amountMonths = {}
    const nameConcept = getConcept(Submission?.concepts, concept)
    const months = moment.months()

    months.forEach(month => {
      amountMonths[month] = Submission?.invoices.filter(invoice => {
        const monthAt = moment(invoice.monthAt, "MMYYYY").format("MMMM")
        if (invoice.concept === concept && monthAt === month) return invoice
      }).reduce((prev, current) => prev + current.amount, 0)
    })

    const total = Object.values(amountMonths).reduce((prev, current) => prev + current, 0)
    return { key: concept, concept: nameConcept, ...amountMonths, total }
  })

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