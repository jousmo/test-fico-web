import { Section } from "../section"
import { Col, Divider, Row, Statistic } from "antd"

export function StatisticHeader({ statistics, styles = {}, valueStyle = {} }){
  return (
    <Section style={{ margin: "1rem 0", ...styles }}>
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
          <Statistic {...statistics[2]} valueStyle={valueStyle} />
        </Col>
      </Row>
    </Section>
  )
}