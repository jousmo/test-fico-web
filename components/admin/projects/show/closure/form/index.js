import { Button, Col, Form, Input, Row, Typography } from "antd"
import { DownloadOutlined } from "@ant-design/icons/lib"
import { useState } from "react"
import { withForm, warning } from "../../../../../../helpers"
import { ConfirmModal, UploadButtonForm } from "../../../../../shared"
import { useRouter } from "next/router"
import "./styles.sass"

function ProjectClosureForm({ data, save }) {
  const { query, route } = useRouter()

  let role = "admin"
  if (route.includes("implementer")) {
    role = "implementer"
  }

  const [form] = Form.useForm()
  const [state, setState] = useState(false)

  const onCloseProject = async () => {
    try {
      await form.validateFields()

      const values = await form.getFieldsValue()

      if (role === "admin") {
        values.status = "ON_CLOSURE"
      }

      save(values)
      setState(false)
    }
    catch (e) {
      warning("Llena los campos requeridos")
      console.error(e)
    }
  }

  const readOnly = data?.status === "ON_CLOSURE"

  const closureDocuments = data?.closureDocuments?.map(doc => ({ ...doc, uid: doc.id }))

  const onDoneFile = async files => {
    const closureDocuments = files?.map(el => {
      return { id: el.id, name: el.name, url: el.url, type: "CLOSURE" }
    })

    try {
      await form.setFieldsValue({ closureDocuments })
    } catch (err) {
      console.error(err)
    }
  }

  const onRemoveFile = async ({ url }) => {
    const oldDocuments = [...data?.closureDocuments]
    const closureDocuments = oldDocuments.filter(document => document.url !== url)
    await form.setFieldsValue({ closureDocuments })
  }

  const handleClick = async () => {
    if (role === "admin") {
      setState(true)
    } else {
      await onCloseProject()
    }
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
              y adjunta los documentos de cierre.
            </Typography.Text>
          </Col>
          <Col>
            <a href={`/${role}/projects/${query.id}/pdf`} target="_blank">
              <Button icon={<DownloadOutlined />}>
                Descargar ficha técnica
              </Button>
            </a>
          </Col>
          <Col>
            <Form.Item
              name="closureDocuments">
              <UploadButtonForm
                disabled={readOnly}
                fileList={closureDocuments}
                onRemoveFile={onRemoveFile}
                onChange={onDoneFile}
                maxFile={5}
                accept={"application/pdf,text/plain"}>
                Subir documentos de cierre
              </UploadButtonForm>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Descripción de cierre de proyecto"
              initialValue={data?.closureDescription}
              id="closureDescription"
              name="closureDescription">
              <Input.TextArea
                placeholder="Describe"
                readOnly={readOnly}
                rows={1} />
            </Form.Item>
          </Col>
          <Col push={19}>
            <Form.Item className="submit">
              <Button
                danger
                disabled={readOnly}
                onClick={handleClick}>
                {role === "admin" ? "Concluir proyecto" : "Guardar"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default withForm(ProjectClosureForm)
