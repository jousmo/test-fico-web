import { Col, Divider, Row, Statistic } from "antd"
import { Section } from "../../../../../../shared/section"

export function ObjectivesSummary() {
  return (
    <Section style={{ margin: "1rem 0" }}>
      <Row>
        <Col flex="auto">
          <Statistic title="Meta" value="90" />
        </Col>
        <Col span={1} style={{textAlign: "center"}}>
          <Divider type="vertical" />
        </Col>
        <Col flex="auto">
          <Statistic title="Real" value="45" />
        </Col>
        <Col span={1} style={{textAlign: "center"}}>
          <Divider type="vertical" />
        </Col>
        <Col flex="auto">
          <Statistic
            value="50%"
            title="Cumplimiento"
            valueStyle={{ color: "#cf1322" }} />
        </Col>
      </Row>
    </Section>
  )
}
