import { Button, Row, Col } from "antd"
import { SaveOutlined } from "@ant-design/icons"

export function PageActions({save}) {
  return (
    <Row justify="end" gutter={10}>
      <Col><Button ghost>Cerrar</Button></Col>
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
