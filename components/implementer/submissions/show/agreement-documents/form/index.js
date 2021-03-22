import { Alert, Col, Form, List, Row } from "antd"
import { withForm, loadingAlert, success } from "../../../../../../helpers"
import { apolloError } from "../../../../../../helpers/bugsnag/notify"
import { FileInput } from "./fileInput"
import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { submission } from '../../../../../../graphql/submission'

function AgreementDocumentsForm({ data, client }) {
  const submissionId = data?.id
  const documents = data?.documents?.map(document => ({ ...document, uid: document.id }))

  const [createDocumentSubmission] = useMutation(
    submission.mutations.createDocuments, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getDetails,
          variables: { id: submissionId }
        }
      ]
    }
  )

  const [deleteDocumentSubmission] = useMutation(
    submission.mutations.deleteDocumentSubmission, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getDetails,
          variables: { id: submissionId }
        }
      ]
    }
  )

  const onDoneFile = useCallback(async (info, cb) => {
    const saving = loadingAlert()
    const { typeFile: type, file: { name, response } } = info
    const url = response?.imageUrl
    const newDocument = { type, name, url, submission: submissionId }

    try {
      await createDocumentSubmission({ variables: { data: [newDocument] } })
      success()
    } catch (e) {
      cb(e)
      apolloError(e)
    }
    saving()
  }, [submissionId, ])

  const onRemoveFile = useCallback(async (file, cb) => {
    const saving = loadingAlert("Eliminando...")
    const { id } = file
    try {
      await deleteDocumentSubmission({ variables: { id }})
      success("Eliminado correctamente...")
    } catch (e) {
      cb(e)
      apolloError(e)
    }
    saving()
  }, [])

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
                files={documents?.filter(document => document.type === "CONSTITUTIVE")}
                onDoneFile={onDoneFile}
                onRemoveFile={onRemoveFile}
              />
              <FileInput
                typeFile="LEGAL_POWER"
                label="Poder representante legal"
                className="documentsAgreement"
                files={documents?.filter(document => document.type === "LEGAL_POWER")}
                onDoneFile={onDoneFile}
                onRemoveFile={onRemoveFile}
              />
              <FileInput
                typeFile="IDENTIFICATION"
                label="Copia de la identificación oficial de representante legal"
                className="documentsAgreement"
                files={documents?.filter(document => document.type === "IDENTIFICATION")}
                onDoneFile={onDoneFile}
                onRemoveFile={onRemoveFile}
              />
              <FileInput
                typeFile="CONSTANCY"
                label="Copia de constancia de situación"
                className="documentsAgreement"
                files={documents?.filter(document => document.type === "CONSTANCY")}
                onDoneFile={onDoneFile}
                onRemoveFile={onRemoveFile}
              />
              <FileInput
                typeFile="PROOF_RESIDENCY"
                label="Comprobante de domicilio"
                className="documentsAgreement"
                files={documents?.filter(document => document.type === "PROOF_RESIDENCY")}
                onDoneFile={onDoneFile}
                onRemoveFile={onRemoveFile}
              />
              <FileInput
                typeFile="ACCOUNT_BALANCE"
                label="Copia de la caratula del estado de cuenta (Cuenta exclusiva de proyecto)"
                className="documentsAgreement"
                files={documents?.filter(document => document.type === "ACCOUNT_BALANCE")}
                onDoneFile={onDoneFile}
                onRemoveFile={onRemoveFile}
              />
            </List>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default withForm(AgreementDocumentsForm)
