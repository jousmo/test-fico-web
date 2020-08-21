import { Button, Form, Input, Space, Typography } from "antd"
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
      <Space direction="vertical">
        <Typography.Text>
          Descarga la ficha técnica y envíalo al área juridica, recaba las firmas
          y adjunta el documento firmado aquí.
        </Typography.Text>
        <Space>
          <Button icon={<DownloadOutlined />}>Descargar ficha técnica</Button>
          <Form.Item
            id="closureDocument"
            name="closureDocument">
            <UploadButton>
              Subir documento de cierre
            </UploadButton>
          </Form.Item>
        </Space>
        <Form.Item
          label="Descripción de cierre de proyecto"
          id="closureDescription"
          name="closureDescription">
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item className="submit">
          <Button
            danger
            htmlType="submit">
            Concluir proyecto
          </Button>
        </Form.Item>
      </Space>
    </Form>
  )
}

export default withForm(ProjectClosureForm)
