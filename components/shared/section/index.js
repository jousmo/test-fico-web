import "./style.sass"
import { Row, Col, Card } from "antd"

export function Section({
  children,
  title,
  fullWidth,
  extra = null,
  style = undefined
}) {
  const rowStyle = fullWidth ? { maxWidth: "100%" } : style

  return (
    <Row className="fico section" style={rowStyle}>
      <Col span={24}>
        <Card
          bordered={false}
          extra={extra}
          title={title}>
          {children}
        </Card>
      </Col>
    </Row>
  )
}
