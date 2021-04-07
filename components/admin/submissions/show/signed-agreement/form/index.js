import { loadingAlert, success, withForm } from "../../../../../../helpers"
import { Button, Form, Input } from "antd"
import { DateField, UploadButton, Visibility } from "../../../../../shared"
import { useCallback, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { submission } from '../../../../../../graphql/submission'
import { apolloError } from "../../../../../../helpers/bugsnag/notify"

function SubmissionAgreementForm({ data, client, onSave, hasContract }) {
  const [state, setState] = useState({})

  const { id: submissionId, status, documents } = data || {}
  const onAgreement = status === "ON_AGREEMENT"
  const files = documents?.filter(document => document.type === "AGREEMENT")?.map(item => ({ ...item, uid: item.id }))

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

  const onDateChange = ({ currentTarget }) => {
    const { id: name, value } = currentTarget
    const target = { name, value }
    onChange({ target })
  }

  const onChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value })
  }

  const onDoneFile = useCallback(async (info, cb) => {
    const saving = loadingAlert()
    const { typeFile: type, file: { name, uid }, urls } = info
    const url = urls.find(el => el.uid === uid).url
    const newDocument = { type, name, url, submission: submissionId }

    try {
      await createDocumentSubmission({ variables: { data: [newDocument] } })
      success()
    } catch (e) {
      cb(e)
      apolloError(e)
    }
    saving()
  }, [submissionId])

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
            onBlur={onChange} />
          <DateField
            id="signedContractAt"
            name="signedContractAt"
            format="DD/MM/YYYY"
            defaultValue={data?.signedContractAt}
            onChange={onDateChange} />
          &nbsp;
          <Button
            onClick={() => onSave(state)}>
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
