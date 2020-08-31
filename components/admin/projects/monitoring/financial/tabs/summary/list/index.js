import { useContext, useState } from "react"
import { Col, Divider, Modal, Row, Statistic } from "antd"
import { ListSummaryConcept} from "./concepts"
import { ListSummaryComparative } from "./comparative"
import { ListSummaryInvestment } from "./investment"
import { AdminSubmissionContext } from "../../../../../../../../contexts/admin/submissions/show"
import { getInvoicesPerYear, getConceptsPerMonths, getConceptsPerTrimestre } from "../../../helpers"

export function ListSummary({ view, year }) {
  const { data: { Submission } } = useContext(AdminSubmissionContext)
  const [state, setState] = useState(false)

  const invoicesPerYear = getInvoicesPerYear(Submission?.invoices, year)
  const onlyConcepts = _.intersection(invoicesPerYear.map(invoice => invoice.concept))
  const conceptsPerMonths = getConceptsPerMonths(Submission, onlyConcepts, invoicesPerYear)
  const conceptsPerTrimestre = getConceptsPerTrimestre(Submission, onlyConcepts, invoicesPerYear)

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
        <ListSummaryConcept year={year} onChange={onChange} dataSource={conceptsPerMonths}/>
      ) : (
        <ListSummaryComparative year={year} onChange={onChange} dataSource={conceptsPerTrimestre}/>
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
