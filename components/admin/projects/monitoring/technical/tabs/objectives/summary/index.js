import { Col, Divider, Row, Statistic } from "antd"
import { Section } from "../../../../../../../shared/section"
import {
  decoratedGoal,
  decoratedReal,
  decoratedFulfilled
} from "./data-decorator"

export function ObjectivesSummary({ data }) {
  const real = decoratedReal(data)
  const goal = decoratedGoal(data)
  const totalFulfilled = decoratedFulfilled(real, goal)
  const color = parseInt(totalFulfilled) >= 80 ? "#008000" : "#cf1322"

  return (
    <Section style={{ margin: "1rem 0" }}>
      <Row>
        <Col flex="auto">
          <Statistic title="Meta" value={goal} />
        </Col>
        <Col span={1} style={{textAlign: "center"}}>
          <Divider type="vertical" />
        </Col>
        <Col flex="auto">
          <Statistic title="Real" value={real} />
        </Col>
        <Col span={1} style={{textAlign: "center"}}>
          <Divider type="vertical" />
        </Col>
        <Col flex="auto">
          <Statistic
            value={totalFulfilled}
            title="Cumplimiento"
            valueStyle={{ color: color }} />
        </Col>
      </Row>
    </Section>
  )
}
