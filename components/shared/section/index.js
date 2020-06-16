import "./style.sass"
import { Row, Col, Card } from "antd";

export function Section({children, title, fullWidth, style = undefined}) {
  const rowStyle = fullWidth ? { maxWidth: "100%" } : style

  return (
    <Row className="fico section" style={rowStyle}>
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
