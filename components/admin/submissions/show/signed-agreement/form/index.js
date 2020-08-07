import { withForm } from "../../../../../../helpers/withForm"
import { Button, Form, Input } from "antd"
import { DateField, UploadButton, Visibility } from "../../../../../shared"
import { useCallback, useState } from 'react'
import { success, warning } from '../../../../../../helpers/alert'
import { useMutation } from '@apollo/react-hooks'
import { submission } from '../../../../../../graphql/submission'

function SubmissionAgreementForm({ data, client, onChange, onSave, hasContract }) {
  const submissionId = data?.id
  const document = data?.documents.filter(document => document.type === "AGREEMENT").map(document => ({...document, uid: document.id}))
  const onAgreement = data?.status === "ON_AGREEMENT"

  const [state, setState] = useState(document)

  const [createDocumentSubmission] = useMutation(
    submission.mutations.createDocumentSubmission, { client: client }
  )

  const [deleteDocumentSubmission] = useMutation(
    submission.mutations.deleteDocumentSubmission, { client: client }
  )

  const onDateChange = ({ currentTarget }) => {
    const { id: name, value } = currentTarget
    const target = { name, value }
    onChange({ target })
  }

  const onDone = useCallback(async ({ typeFile: type, file: { name, response } }) => {
    const url = response?.imageUrl
    const newDocument = { type, name, url }
    debugger
    try {
      const { data: { CreateDocumentSubmission: { id }}} = await createDocumentSubmission({
        variables: { data: newDocument, id: submissionId}
      })
      const document = [{ ...newDocument, uid: id, id }]
      success("Documento agregado correctamente")
      setState(document)
    } catch (e) {
      warning("Hubo un error al subir el documento")
      console.error(e)
    }
  }, [state, submissionId])

  const onRemove = useCallback(async ({ id }) => {
    try {
      await deleteDocumentSubmission({ variables: { id }})
      success("Documento eliminado correctamente")
      setState([])
    } catch (e) {
      warning("Hubo un error al eliminar el documento")
      console.error(e)
    }
  }, [state])

  return (
    <Form
      name="submission-agreement">
      <Form.Item style={{marginBottom: "5px"}}>
        Anexa el convenio firmado
      </Form.Item>
      <Visibility visible={onAgreement}>
        <Form.Item label="Numero y fecha de firma de convenio">
          <Input
            name="agreementNumber"
            style={{width: "140px", marginRight: "5px"}}
            placeholder="Numero de acuerdo"
            defaultValue={data?.agreementNumber}
            onChange={onChange} />
          <DateField
            id="signedContractAt"
            defaultValue={data?.signedContractAt}
            onChange={onDateChange} />
          &nbsp;
          <Button
            onClick={onSave}>
            Guardar
          </Button>
        </Form.Item>
      </Visibility>
      <Form.Item style={{marginBottom: "5px"}}>
        <UploadButton
          typeFile="AGREEMENT"
          disabled={!hasContract}
          onDone={onDone}
          onRemove={onRemove}
          files={state}
        >
          Subir convenio firmado
        </UploadButton>
      </Form.Item>
    </Form>
  )
}

export default withForm(SubmissionAgreementForm)
