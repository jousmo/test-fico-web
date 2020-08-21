import { Button, Col, Form, Input, Row, Typography } from "antd"
import { DownloadOutlined } from "@ant-design/icons/lib"
import { useState } from "react"
import { withForm } from "../../../../../../helpers/withForm"
import { ConfirmModal, UploadButton } from "../../../../../shared"
import "./styles.sass"

function ProjectClosureForm({ data }) {
  const [form] = Form.useForm()
  const [state, setState] = useState(false)

  const onCloseProject = async () => {
    const values = await form.getFieldsValue()
    //Todo: close project
    setState(false)
  }

  return (
    <>
      <ConfirmModal
        body="Ya no se podrán hacer modificaciones"
        cancelText="Conservar abierto"
        onCancel={() => setState(false)}
        onOk={onCloseProject}
        okText="Concluir"
        title="¿Cerrar este proyecto?"
        visible={state} />
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
                onClick={() => setState(true)}>
                Concluir proyecto
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default withForm(ProjectClosureForm)
