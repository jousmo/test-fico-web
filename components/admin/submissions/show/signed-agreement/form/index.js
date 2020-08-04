import { withForm } from "../../../../../../helpers/withForm"
import { Button, Form, Input } from "antd"
import { DateField, UploadButton, Visibility } from "../../../../../shared"

function SubmissionAgreementForm({ data, onChange, onSave, hasContract }) {
  const onDateChange = ({ currentTarget }) => {
    const { id: name, value } = currentTarget
    const target = { name, value }
    onChange({ target })
  }

  const onAgreement = data?.status === "ON_AGREEMENT"

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
          disabled={!hasContract}>
          Subir convenio firmado
        </UploadButton>
      </Form.Item>
    </Form>
  )
}

export default withForm(SubmissionAgreementForm)
