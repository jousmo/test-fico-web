import { withForm } from "../../../../../../../helpers/withForm"
import { Form, Row, Col, Input } from "antd"

function DevelopmentObjectivesForm({data=true, onChange}) {
  return (
    <Form
      name="project-details"
      layout="vertical">
      <Row gutter={[10, 8]} justify="start">
      <Col span={24}>
        <Form.Item
          style={{display: "inline"}}
          label="Objetivo de desarrollo">
          <Input.TextArea
            id="developmentObjective"
            name="developmentObjective"
            defaultValue={data?.Implementer?.developmentObjective}
            onChange={onChange}
            autoSize={{minRows: 3}} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          style={{display: "inline"}}
          label="Objetivo de general">
          <Input.TextArea
            id="generalObjective"
            name="generalObjective"
            defaultValue={data?.Implementer?.generalObjective}
            onChange={onChange}
            autoSize={{minRows: 3}} />
        </Form.Item>
      </Col>
    </Row>
    </Form>
  )
}

export default withForm(DevelopmentObjectivesForm)
