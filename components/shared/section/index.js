import "./style.sass"
import { Row, Col, Card } from "antd";

export function Section({children, title, fullWidth}) {
  const style = fullWidth ? { maxWidth: "100%" } : undefined
  
  return (
    <Row className="fico section" style={style}>
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
