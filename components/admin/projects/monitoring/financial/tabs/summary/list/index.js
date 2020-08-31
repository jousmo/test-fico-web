import { useContext, useState } from "react"
import { Col, Divider, Modal, Row, Statistic } from "antd"
import { ListSummaryConcept} from "./concepts"
import { ListSummaryComparative } from "./comparative"
import { ListSummaryInvestment } from "./investment"
import { AdminSubmissionContext } from "../../../../../../../../contexts/admin/submissions/show"
import { getInvoicesPerYearOrSearch, getConceptsPerMonths, getConceptsPerTrimestre } from "../../../helpers"

export function ListSummary({ view, year, search }) {
  const { data: { Submission } } = useContext(AdminSubmissionContext)
  const [state, setState] = useState({ showModal: false })

  const invoicesPerYearOrSearch = getInvoicesPerYearOrSearch(Submission, year, search)
  const onlyConcepts = _.intersection(invoicesPerYearOrSearch.map(invoice => invoice.concept))
  const conceptsPerMonths = getConceptsPerMonths(Submission, onlyConcepts, invoicesPerYearOrSearch)
  const conceptsPerTrimestre = getConceptsPerTrimestre(Submission, onlyConcepts, invoicesPerYearOrSearch)

  const onChange = () => {
    setState({ showModal: true })
  }

  const onCancel = () => {
    setState({ showModal: false })
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
        <ListSummaryConcept
          onChange={onChange}
          dataSource={conceptsPerMonths } />
      ) : (
        <ListSummaryComparative
          onChange={onChange}
          dataSource={conceptsPerTrimestre} />
      )}

      <Modal
        className="fico investment-modal"
        title="Resumen de inversión Enero 2020"
        visible={state.showModal}
        width={1400}
        onCancel={onCancel}
        footer={renderStatistics()}>
        <ListSummaryInvestment />
      </Modal>
    </>
  )
}
