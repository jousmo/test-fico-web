import { withForm } from "../../../../../../helpers/withForm"
import { Alert, Col, Form, List, Row } from "antd"
import { FileInput } from "../../../../profile/legal-documents/form/fileInput"
import { useCallback, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { submission } from '../../../../../../graphql/submission'
import { success, warning } from '../../../../../../helpers/alert'

function AgreementDocumentsForm({ data, client }) {
  const submissionId = data?.id
  const documents = data?.documents.map(document => ({...document, uid: document.id}))

  const [state, setState] = useState(documents)

  const [createDocumentSubmission] = useMutation(
    submission.mutations.createDocumentSubmission, { client: client }
  )

  const [deleteDocumentSubmission] = useMutation(
    submission.mutations.deleteDocumentSubmission, { client: client }
  )

  const onDone = useCallback(async ({ typeFile: type, file: { name, response } }) => {
    const url = response?.imageUrl
    const newDocument = { type, name, url }

    try {
      const { data: { CreateDocumentSubmission: { id }}} = await createDocumentSubmission({
        variables: { data: newDocument, id: submissionId}
      })
      const documents = [...state, { ...newDocument, uid: id, id }]
      success("Documento agregado correctamente")
      setState(documents)
    } catch (e) {
      warning("Hubo un error al subir el documento")
      console.error(e)
    }
  }, [state, submissionId])

  const onRemove = useCallback(async ({ id }) => {
    if (!id) return null

    try {
      await deleteDocumentSubmission({ variables: { id }})
      success("Documento eliminado correctamente")
      const documents = state.filter(document => document.id !== id)
      setState(documents)
    } catch (e) {
      warning("Hubo un error al eliminar el documento")
      console.error(e)
    }
  }, [state])


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
                files={state.filter(document => document.type === "CONSTITUTIVE")}
                onDone={onDone}
                onRemove={onRemove}
              />
              <FileInput
                typeFile="LEGAL_POWER"
                label="Poder representante legal"
                className="documentsAgreement"
                files={state.filter(document => document.type === "LEGAL_POWER")}
                onDone={onDone}
                onRemove={onRemove}
              />
              <FileInput
                typeFile="IDENTIFICATION"
                label="Copia de la identificación oficial de representante legal"
                className="documentsAgreement"
                files={state.filter(document => document.type === "IDENTIFICATION")}
                onDone={onDone}
                onRemove={onRemove}
              />
              <FileInput
                typeFile="CONSTANCY"
                label="Copia de constancia de situación"
                className="documentsAgreement"
                files={state.filter(document => document.type === "CONSTANCY")}
                onDone={onDone}
                onRemove={onRemove}
              />
              <FileInput
                typeFile="PROOF_RESIDENCY"
                label="Comprobante de domicilio"
                className="documentsAgreement"
                files={state.filter(document => document.type === "PROOF_RESIDENCY")}
                onDone={onDone}
                onRemove={onRemove}
              />
              <FileInput
                typeFile="ACCOUNT_BALANCE"
                label="Copia de la caratula del estado de cuenta (Cuenta exclusiva de proyecto)"
                className="documentsAgreement"
                files={state.filter(document => document.type === "ACCOUNT_BALANCE")}
                onDone={onDone}
                onRemove={onRemove}
              />
            </List>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default withForm(AgreementDocumentsForm)
