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

  return (
    <Row
      align="middle"
      className="fico login container"
      justify="center">
      <Col span={5}>
        <LoginHeading />
        <LoginForm onSubmit={login} />
      </Col>
    </Row>
  )
}
