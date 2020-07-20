import { Button, Row, Col } from "antd"
import { SaveOutlined } from "@ant-design/icons"
import "./style.sass"

export function SaveHeader({ save }){
  return (
    <Row justify="end" className="fico save-header">
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
