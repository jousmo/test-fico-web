import { Section } from "../section"
import { Col, Divider, Row, Statistic } from "antd"

export function StatisticHeader({ statistics }){
  return (
    <Section style={{ margin: "1rem 0" }}>
      <Row>
        <Col flex="auto">
          <Statistic {...statistics[0]} />
        </Col>
        <Col span={1} style={{textAlign: "center"}}>
          <Divider type="vertical" />
        </Col>
        <Col flex="auto">
          <Statistic {...statistics[1]} />
        </Col>
        <Col span={1} style={{textAlign: "center"}}>
          <Divider type="vertical" />
        </Col>
        <Col flex="auto">
          <Statistic {...statistics[2]} />
        </Col>
      </Row>
    </Section>
  )
}
