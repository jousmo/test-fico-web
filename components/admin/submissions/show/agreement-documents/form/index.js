import { withForm } from "../../../../../../helpers/withForm"
import { Alert, Col, Form, List, Row } from "antd"
import { PaperClipOutlined } from "@ant-design/icons"
import { DeleteButton } from "../../../../../shared"

function AgreementDocumentsForm({ data }) {

  const getAction = () => {
    return [
      <a><PaperClipOutlined />&nbsp;documento.pdf</a>,
      <DeleteButton style={{float: "none"}} />
    ]
  }

  if (data?.Submission?.status !== "ON_AGREEMENT"){
    return (
      <Alert
        message="Cuando se apruebe el proyecto de la implementadora se podrán
        descargar los documentos de la solicitud."
        type="warning"
      />
    )
  }

  return (
    <Form
      name="organizational-chart"
      layout="vertical">
      <Row gutter={[10, 8]} justify="start">
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label="Documentos de la implementadora para firma de convenio">
            <List bordered>
              <List.Item actions={getAction()}>
                Acta constitutiva
              </List.Item>
              <List.Item actions={getAction()}>
                Poder representante legal
              </List.Item>
              <List.Item actions={getAction()}>
                Copia de la identificación oficial de representante legan
              </List.Item>
              <List.Item actions={getAction()}>
                Copia de constancia de situación
              </List.Item>
              <List.Item actions={getAction()}>
                Comprobante de domicilio
              </List.Item>
              <List.Item actions={getAction()}>
                Copia de la caratula del estado de cuenta (Cuenta exclusiva
                de proyecto)
              </List.Item>
            </List>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default withForm(AgreementDocumentsForm)
