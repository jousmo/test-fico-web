import { useContext, useState } from "react"
import { Col, Divider, Modal, Row, Statistic } from "antd"
import { ListSummaryConcept} from "./concepts"
import { ListSummaryComparative } from "./comparative"
import { ListSummaryInvestment } from "./investment"
import { AdminSubmissionContext } from "../../../../../../../../contexts/admin/submissions/show"
import moment from "moment"
import { getConcept } from "../../../helpers"

export function ListSummary({ view, year }) {
  const { data: { Submission } } = useContext(AdminSubmissionContext)
  const [state, setState] = useState(false)

  const invoicesPerYear = Submission?.invoices.filter(invoice => {
    const yearInvoice = moment(invoice.monthAt, "MMYYYY").format("YYYY")
    if (yearInvoice === year) return invoice
  })

  const concepts = _.intersection(invoicesPerYear.map(invoice => invoice.concept))

  const dataSource = concepts.map(concept => {
    const amountMonths = {}
    const nameConcept = getConcept(Submission?.concepts, concept)
    const months = moment.months()

    months.forEach(month => {
      amountMonths[month] = invoicesPerYear.filter(invoice => {
        const monthAt = moment(invoice.monthAt, "MMYYYY").format("MMMM")
        if (invoice.concept === concept && monthAt === month) return invoice
      }).reduce((prev, current) => prev + current.amount, 0)
    })

    const total = Object.values(amountMonths).reduce((prev, current) => prev + current, 0)
    return { key: concept, concept: nameConcept, ...amountMonths, total }
  })


  const dataSourceTrimestre = concepts.map(concept => {
    const amountTrimestre = {}
    const nameConcept = getConcept(Submission?.concepts, concept)

    for (let i = 1; i <= 4; i++) {
      const sufix = (i === 1 || i === 3) ? 'er' : i === 2 ? "do" : "to"
      amountTrimestre[`${i}${sufix}`] = invoicesPerYear.filter(invoice => {
        const quarter = moment(invoice.monthAt, "MMYYYY").quarter()
        if (invoice.concept === concept && quarter === i) return invoice
      }).reduce((prev, current) => prev + current.amount, 0)
    }

    const total = Object.values(amountTrimestre).reduce((prev, current) => prev + current, 0)
    return { key: concept, concept: nameConcept, ...amountTrimestre, total }
  })

  const onChange = () => {
    setState(true)
  }

  const onCancel = () => {
    setState(false)
  }

  const renderStatistics = () => (
    <Row>
      <Col flex="auto">
        <Statistic title="Total de conceptos" value="134" />
      </Col>
      <Col span={1}>
        <Divider type="vertical" />
      </Col>
      <Col flex="auto">
        <Statistic title="Total presupuesto" value="$1,368.00" />
      </Col>
      <Col span={1}>
        <Divider type="vertical" />
      </Col>
      <Col flex="auto">
        <Statistic title="Total ejercido" value="$0.00" />
      </Col>
      <Col span={1}>
        <Divider type="vertical" />
      </Col>
      <Col flex="auto">
        <Statistic title="Total Ficosec" value="$0.00" />
      </Col>
      <Col span={1}>
        <Divider type="vertical" />
      </Col>
      <Col flex="auto">
        <Statistic title="Total Ficosec" value="$0.00" />
      </Col>
      <Col span={1}>
        <Divider type="vertical" />
      </Col>
      <Col flex="auto">
        <Statistic title="Total Implementadora" value="$0.00" />
      </Col>
      <Col span={1}>
        <Divider type="vertical" />
      </Col>
      <Col flex="auto">
        <Statistic title="Total Coinversionista 1" value="$1,368.00" />
      </Col>
      <Col span={1}>
        <Divider type="vertical" />
      </Col>
      <Col flex="auto">
        <Statistic title="Total Coinversionista 2" value="$1,368.00" />
      </Col>
      <Col span={1}>
        <Divider type="vertical" />
      </Col>
      <Col flex="auto">
        <Statistic title="Total Remanente" value="$0.00" />
      </Col>
    </Row>
  )

  return (
    <>
      {view === "Mensual" ? (
        <ListSummaryConcept year={year} onChange={onChange} dataSource={dataSource}/>
      ) : (
        <ListSummaryComparative year={year} onChange={onChange} dataSourceTrimestre={dataSourceTrimestre}/>
      )}

      <Modal
        className="fico investment-modal"
        title="Resumen de inversión Enero 2020"
        visible={state}
        width={1400}
        onCancel={onCancel}
        footer={renderStatistics()}>
        <ListSummaryInvestment />
      </Modal>
    </>
  )
}
