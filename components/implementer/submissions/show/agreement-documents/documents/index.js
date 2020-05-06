import { withForm } from "../../../../../../helpers/withForm"
import { Col, Form, List, Row } from "antd"
import { FileInput } from "../../../../profile/legal-documents/form/fileInput"

function AgreementDocuments({ data }) {
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

export default withForm(AgreementDocuments)
