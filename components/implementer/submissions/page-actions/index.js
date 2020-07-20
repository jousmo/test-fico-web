import { Button, Row, Col } from "antd"
import { SaveOutlined } from "@ant-design/icons"
import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../contexts/implementer/submissions/new/context"

export function PageActions({save}) {
  const {
    router
  } = useContext(ImplementerSubmissionContext)

  const handleClose = () => {
    const { route } = router
    let role = undefined
    if (route.includes("implementer")) {
      role = "implementer"
    } else {
      role = "admin"
    }
    router.push(`/${role}/submissions`)
  }

  return (
    <Row justify="end" gutter={10}>
      <Col><Button ghost onClick={handleClose}>Cerrar</Button></Col>
      <Col>
        <Button
          icon={<SaveOutlined />}
          onClick={() => { save() }}
          type="primary">
          Guardar
        </Button>
      </Col>
    </Row>
  )
}
