import { Button, Row, Col } from "antd"
import { useRouter } from "next/router"

export function PageActions() {
  const router = useRouter()

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
