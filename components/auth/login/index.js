import { Row, Col } from "antd"
import { useContext } from "react"
import {
  AuthSubmissionContext
} from "../../../contexts/auth"
import { LoginForm } from "./form"
import { LoginHeading } from "./heading"
import "./style.sass"

export function LoginContainer() {
  const {
    login
  } = useContext(AuthSubmissionContext)

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
        <LoginForm onSubmit={login} />
      </Col>
    </Row>
  )
}
