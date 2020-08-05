import { withForm } from "../../../../../../helpers/withForm"
import { Alert, Col, Form, List, Row } from "antd"
import { FileInput } from "../../../../profile/legal-documents/form/fileInput"
import { useState } from 'react'

const INIT_STATE = {
  CONSTITUTIVE: false,
  LEGAL_POWER: false,
  IDENTIFICATION: false,
  CONSTANCY: false,
  PROOF_RESIDENCY: false,
  ACCOUNT_BALANCE: false
}

function AgreementDocumentsForm({ data }) {
  const [state, setState] = useState(INIT_STATE)

  const handleUploadChange = ({ typeFile, file: { status }}) => {
    if (status !== "removed") {
      setState({ ...state, [typeFile]: true })
    } else {
      setState({ ...state, [typeFile]: false })
    }
  }

  if (data?.status !== "ON_AGREEMENT"){
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
            <List>
              <FileInput
                typeFile="CONSTITUTIVE"
                label="Acta constitutiva"
                onChange={handleUploadChange}
                className="documentsAgreement"
                disabled={state.CONSTITUTIVE}
              />
              <FileInput
                typeFile="LEGAL_POWER"
                label="Poder representante legal"
                onChange={handleUploadChange}
                className="documentsAgreement"
                disabled={state.LEGAL_POWER}
              />
              <FileInput
                typeFile="IDENTIFICATION"
                label="Copia de la identificación oficial de representante legal"
                onChange={handleUploadChange}
                className="documentsAgreement"
                disabled={state.IDENTIFICATION}
              />
              <FileInput
                typeFile="CONSTANCY"
                label="Copia de constancia de situación"
                onChange={handleUploadChange}
                className="documentsAgreement"
                disabled={state.CONSTANCY}
              />
              <FileInput
                typeFile="PROOF_RESIDENCY"
                label="Comprobante de domicilio"
                onChange={handleUploadChange}
                className="documentsAgreement"
                disabled={state.PROOF_RESIDENCY}
              />
              <FileInput
                typeFile="ACCOUNT_BALANCE"
                label="Copia de la caratula del estado de cuenta (Cuenta exclusiva de proyecto)"
                onChange={handleUploadChange}
                className="documentsAgreement"
                disabled={state.ACCOUNT_BALANCE}
              />
            </List>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default withForm(AgreementDocumentsForm)
