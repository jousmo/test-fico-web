import { withForm } from "../../../../../../helpers/withForm"
import {Col, Form, List, Row, Typography} from "antd"
import { FileInput } from "../../../../profile/legal-documents/form/fileInput"

function AgreementDocuments({ data }) {
  return (
    <div>
      { data?.Submission?.status === "ON_AGREEMENT" ? (
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
      ) : (
        <Typography.Text>
          Cuando se apruebe el proyecto se podrán subir los anexos de la
          solicitud.
        </Typography.Text>
      )}
    </div>
  )
}

export default withForm(AgreementDocuments)
