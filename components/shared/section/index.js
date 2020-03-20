import "./style.sass"
import { Row, Col, Card } from "antd";

export function Section({children, title}) {
  return (
    <Row className="fico section">
      <Col span={24}>
        <Card
          bordered={false}
          title={title}>
          {children}
        </Card>
      </Col>
    </Row>
  )
}
