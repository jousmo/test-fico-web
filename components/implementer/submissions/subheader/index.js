import { Row, Col } from "antd";
import { Steps } from "../steps";

export function Subheader({title, actions}) {
  return (
    <Row>
      <Col flex={2}>{title}</Col>
      <Col flex="auto"><Steps /></Col>
      <Col flex={2}>{actions}</Col>
    </Row>
  )
}
