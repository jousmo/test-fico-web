import { Button, Row, Col } from "antd"
import { SaveOutlined } from "@ant-design/icons"
import "./style.sass"

export function SaveHeader({ save, isSaving }){
  return (
    <Row justify="end" className="fico save-header">
      <Col>
        <Button
          icon={<SaveOutlined />}
          loading={isSaving}
          onClick={() => { save() }}
          type="primary">
          Guardar
        </Button>
      </Col>
    </Row>
  )
}
