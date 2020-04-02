import { Row, Col } from "antd"
import { Steps } from "../steps"

export function Subheader({title, actions, step}) {
  return (
    <Row align="middle">
      <Col flex={2} className="ant-page-header-heading-title">{title}</Col>
      <Col flex="auto"><Steps current={step} /></Col>
      <Col flex={2}><div className="float-right">{actions}</div></Col>
    </Row>
  )
}
