import { withForm } from "../../../../../../helpers/withForm"
import { Button, Form, Input } from "antd"
import { DateField, UploadButton, Visibility } from "../../../../../shared"
import { useCallback } from 'react'
import { success, warning } from '../../../../../../helpers/alert'
import { useMutation } from '@apollo/react-hooks'
import { submission } from '../../../../../../graphql/submission'

function SubmissionAgreementForm({ data, client, onChange, onSave, hasContract, refetch }) {
  const submissionId = data?.id
  const onAgreement = data?.status === "ON_AGREEMENT"
  const filter = data?.documents.filter(document => document.type === "AGREEMENT")
  const document = filter?.map(document => ({...document, uid: document.id}))

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

    try {
      await createDocumentSubmission({ variables: { data: newDocument, id: submissionId } })
      success("Documento agregado correctamente")
      refetch()
    } catch (e) {
      warning("Hubo un error al subir el documento")
      console.error(e)
    }
  }, [submissionId])

  const onRemove = useCallback(async ({ id }) => {
    try {
      await deleteDocumentSubmission({ variables: { id }})
      success("Documento eliminado correctamente")
      refetch()
    } catch (e) {
      warning("Hubo un error al eliminar el documento")
      console.error(e)
    }
  }, [])

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
            name="signedContractAt"
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
          files={document}
        >
          Subir convenio firmado
        </UploadButton>
      </Form.Item>
    </Form>
  )
}

export default withForm(SubmissionAgreementForm)
