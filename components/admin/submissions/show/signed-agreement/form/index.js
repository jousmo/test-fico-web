import { withForm } from "../../../../../../helpers/withForm"
import { Button, Form, Input } from "antd"
import { DateField, UploadButton, Visibility } from "../../../../../shared"
import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { submission } from '../../../../../../graphql/submission'

function SubmissionAgreementForm({ data, client, onChange, onSave, hasContract, refetch }) {
  const { id: submissionId, status, documents } = data || {}
  const onAgreement = status === "ON_AGREEMENT"
  const files = documents?.filter(document => document.type === "AGREEMENT").map(item => ({...item, uid: item.id}))

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

  const onDoneFile = useCallback(async (info, cb) => {
    const { typeFile: type, file: { name, response } } = info
    const url = response?.imageUrl
    const newDocument = { type, name, url }

    try {
      await createDocumentSubmission({ variables: { data: newDocument, id: submissionId } })
      cb(null, refetch)
    } catch (e) {
      cb(e)
      console.error(e)
    }
  }, [submissionId, refetch])

  const onRemoveFile = useCallback(async (file, cb) => {
    const { id } = file
    try {
      await deleteDocumentSubmission({ variables: { id }})
      cb(null, refetch)
    } catch (e) {
      cb(e)
      console.error(e)
    }
  }, [refetch])

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
          disabled={hasContract}
          onDoneFile={onDoneFile}
          onRemoveFile={onRemoveFile}
          files={files}>
          Subir convenio firmado
        </UploadButton>
      </Form.Item>
    </Form>
  )
}

export default withForm(SubmissionAgreementForm)
