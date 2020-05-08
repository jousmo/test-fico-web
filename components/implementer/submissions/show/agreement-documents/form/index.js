import { withForm } from "../../../../../../helpers/withForm"
import { Alert, Col, Form, List, Row } from "antd"
import { FileInput } from "../../../../profile/legal-documents/form/fileInput"

function AgreementDocumentsForm({ data }) {

  if (data?.Submission?.status !== "ON_AGREEMENT"){
    return (
      <Alert
        message="Cuando se apruebe el proyecto de la implementadora se podrán
        subir los documentos de la solicitud."
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
              <FileInput label="Acta constitutiva" />
              <FileInput label="Poder representante legal" />
              <FileInput
                label="Copia de la identificación oficial de
                representante legan" />
              <FileInput label="Copia de constancia de situación" />
              <FileInput label="Comprobante de domicilio" />
              <FileInput label="Copia de la caratula del estado de cuenta
              (Cuenta exclusiva de proyecto)" />
            </List>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default withForm(AgreementDocumentsForm)
