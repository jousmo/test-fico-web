import { withForm } from "../../../../../../helpers/withForm"
import { Alert, Col, Form, List, Row } from "antd"
import { FileInput } from "../../../../profile/legal-documents/form/fileInput"
import { useState } from 'react'

function AgreementDocumentsForm({ data, onChange }) {
  const [state, setState] = useState({})

  const handleChangeUpload = (info) => {
    const { typeFile: type, file: { uid, name, status, response } } = info || {}
    const url = response?.imageUrl

    if (status === "removed") {
      setState({
        ...state,
        [type]: {
          disabled: false,
          fileList: []
        }
      })
    } else {
      setState({
        ...state,
        [type]: {
          disabled: true,
          fileList: [{ uid, name, status, url }]
        }
      })
    }

    if (status === "done") {
      onChange({ type, name, url })
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
                className="documentsAgreement"
                onChange={handleChangeUpload}
                disabled={state["CONSTITUTIVE"]?.disabled}
                fileList={state["CONSTITUTIVE"]?.fileList}
              />
              <FileInput
                typeFile="LEGAL_POWER"
                label="Poder representante legal"
                className="documentsAgreement"
                onChange={handleChangeUpload}
                disabled={state["LEGAL_POWER"]?.disabled}
                fileList={state["LEGAL_POWER"]?.fileList}
              />
              <FileInput
                typeFile="IDENTIFICATION"
                label="Copia de la identificación oficial de representante legal"
                className="documentsAgreement"
                onChange={handleChangeUpload}
                disabled={state["IDENTIFICATION"]?.disabled}
                fileList={state["IDENTIFICATION"]?.fileList}
              />
              <FileInput
                typeFile="CONSTANCY"
                label="Copia de constancia de situación"
                className="documentsAgreement"
                onChange={handleChangeUpload}
                disabled={state["CONSTANCY"]?.disabled}
                fileList={state["CONSTANCY"]?.fileList}
              />
              <FileInput
                typeFile="PROOF_RESIDENCY"
                label="Comprobante de domicilio"
                className="documentsAgreement"
                onChange={handleChangeUpload}
                disabled={state["PROOF_RESIDENCY"]?.disabled}
                fileList={state["PROOF_RESIDENCY"]?.fileList}
              />
              <FileInput
                typeFile="ACCOUNT_BALANCE"
                label="Copia de la caratula del estado de cuenta (Cuenta exclusiva de proyecto)"
                className="documentsAgreement"
                onChange={handleChangeUpload}
                disabled={state["ACCOUNT_BALANCE"]?.disabled}
                fileList={state["ACCOUNT_BALANCE"]?.fileList}
              />
            </List>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default withForm(AgreementDocumentsForm)
