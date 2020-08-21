import { Button, Col, Form, Input, Row, Typography } from "antd"
import { DownloadOutlined } from "@ant-design/icons/lib"
import { withForm } from "../../../../../../helpers/withForm"
import { UploadButton } from "../../../../../shared/upload-button"
import "./styles.sass"

function ProjectClosureForm({ data }) {
  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      className="fico project closure"
      layout="vertical">
      <Row gutter={[10, 8]}>
        <Col span={24}>
          <Typography.Text>
            Descarga la ficha técnica y envíalo al área juridica, recaba las firmas
            y adjunta el documento firmado aquí.
          </Typography.Text>
        </Col>
        <Col>
          <Button icon={<DownloadOutlined />}>Descargar ficha técnica</Button>
        </Col>
        <Col>
          <Form.Item
            id="closureDocument"
            name="closureDocument">
            <UploadButton>
              Subir documento de cierre
            </UploadButton>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Descripción de cierre de proyecto"
            id="closureDescription"
            name="closureDescription">
            <Input.TextArea placeholder="Describe" rows={1} />
          </Form.Item>
        </Col>
        <Col push={19}>
          <Form.Item className="submit">
            <Button
              danger
              htmlType="submit">
              Concluir proyecto
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default withForm(ProjectClosureForm)
