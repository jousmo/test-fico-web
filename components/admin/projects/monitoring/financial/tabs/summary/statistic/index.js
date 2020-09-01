import { Col, Divider, Row, Statistic } from "antd"
import { cellFormat } from "../../../../../../../../helpers"

export function StatisticSummaryConcepts ({ totalsSummaryConcepts }) {
  return (
    <Row>
      <Col flex="auto">
        <Statistic title="Total de conceptos" value={totalsSummaryConcepts?.totalConcepts} />
      </Col>
      <Col span={1}>
        <Divider type="vertical" />
      </Col>
      <Col flex="auto">
        <Statistic title="Total presupuesto" value={cellFormat.money(totalsSummaryConcepts?.budgeted).children} />
      </Col>
      <Col span={1}>
        <Divider type="vertical" />
      </Col>
      <Col flex="auto">
        <Statistic title="Total ejercido" value={cellFormat.money(totalsSummaryConcepts?.amount).children} />
      </Col>
      <Col span={1}>
        <Divider type="vertical" />
      </Col>
      <Col flex="auto">
        <Statistic title="Total Ficosec" value={cellFormat.money(totalsSummaryConcepts?.ficosecPayment).children} />
      </Col>
      <Col span={1}>
        <Divider type="vertical" />
      </Col>
      <Col flex="auto">
        <Statistic title="Total Implementadora" value={cellFormat.money(totalsSummaryConcepts?.implementerPayment).children} />
      </Col>
      <Col span={1}>
        <Divider type="vertical" />
      </Col>
      <Col flex="auto">
        <Statistic title="Total Coinversionista 1" value={cellFormat.money(totalsSummaryConcepts?.investmentOnePayment).children} />
      </Col>
      <Col span={1}>
        <Divider type="vertical" />
      </Col>
      <Col flex="auto">
        <Statistic title="Total Coinversionista 2" value={cellFormat.money(totalsSummaryConcepts?.investmentTwoPayment).children} />
      </Col>
      <Col span={1}>
        <Divider type="vertical" />
      </Col>
      <Col flex="auto">
        <Statistic title="Total Remanente" value={cellFormat.money(totalsSummaryConcepts?.diference).children} />
      </Col>
    </Row>
  )
}
