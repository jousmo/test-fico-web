import { withForm } from "../../../../../../helpers/withForm"
import { Button, Form } from "antd"
import { DateField, UploadButton, Visibility } from "../../../../../shared"
import { getSelectValue } from "../../../../../../helpers/getSelectValue"

function SubmissionAgreementForm({ data, onChange, onSave, hasContract }) {
  const onDateChange = dateObject => {
    const newSignDate = getSelectValue(dateObject)
    onChange(newSignDate)
  }

  const onAgreement = data?.status === "ON_AGREEMENT"

  return (
    <Form
      name="submission-agreement">
      <Form.Item style={{marginBottom: "5px"}}>
        Anexa el convenio firmado
      </Form.Item>
      <Visibility visible={onAgreement}>
        <Form.Item label="Fecha de firma de convenio">
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
