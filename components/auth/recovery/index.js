import { Row, Col } from "antd"
import { RecoverForm } from "./form"
import { RecoverHeading } from "./heading"
import { Recover } from "../../../helpers/auth/recover"
import "./style.sass"

export function RecoveryContainer() {
  const onFinish = async ({ email }) => {
    await Recover(email)
  }

  const sizeProps = {
    xs: 16,
    sm: 16,
    md: 8,
    lg: 5
  }

  return (
    <Row
      align="middle"
      className="fico recover container"
      justify="center">
      <Col {...sizeProps}>
        <RecoverHeading />
        <RecoverForm onSubmit={onFinish} />
      </Col>
    </Row>
  )
}
