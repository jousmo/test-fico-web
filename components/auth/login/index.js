import { Row, Col } from "antd"
import { LoginForm } from "./form"
import { LoginHeading } from "./heading"
import { Authenticate } from "../../../helpers/auth/login"
import "./style.sass"

export function LoginContainer() {
  const onFinish = async ({ email, password }) => {
    await Authenticate(email, password)
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
      className="fico login container"
      justify="center">
      <Col {...sizeProps}>
        <LoginHeading />
        <LoginForm onSubmit={onFinish} />
      </Col>
    </Row>
  )
}
