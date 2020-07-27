import { Button, Row, Col } from "antd"
import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../contexts/implementer/submissions/new/context"

export function PageActions() {
  const {
    router
  } = useContext(ImplementerSubmissionContext)

  const handleClose = () => {
    const { route } = router
    let role = "admin"
    if (route.includes("implementer")) {
      role = "implementer"
    }
    router.push(`/${role}/submissions`)
  }

  return (
    <Row justify="end" gutter={10}>
      <Col><Button ghost onClick={handleClose}>Cerrar</Button></Col>
    </Row>
  )
}
