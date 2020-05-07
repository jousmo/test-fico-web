import { withForm } from "../../../../../../helpers/withForm"
import { Button, Form, Typography } from "antd"
import { DateField, UploadButton, Visibility } from "../../../../../shared"
import { getSelectValue } from "../../../../../../helpers/getSelectValue"

function SubmissionAgreementForm({ isSaveHidden, data, onChange, onSave }) {

  const onDateChange = dateObject => {
    const newSignDate = getSelectValue(dateObject)
    onChange(newSignDate)
  }

  const onAgreement = data?.Submission?.status === "ON_AGREEMENT"

  return (
    <Form
      name="submission-agreement">
      <Typography.Paragraph>
        Anexa el convenio firmado
      </Typography.Paragraph>
      <Visibility visible={onAgreement}>
        <Form.Item
          style={{marginBottom: "10px"}}
          label="Fecha de firma de convenio">
          <DateField
            id="contractSignDate"
            defaultValue={data?.contractSignDate}
            onChange={onDateChange} />
          &nbsp;
          <Button
            onClick={onSave}
            hidden={isSaveHidden}>
            Guardar
          </Button>
        </Form.Item>
      </Visibility>
      <UploadButton
        style={{margin: "5px"}}
        disabled={!data?.Submission?.contractSignDate}>
        Subir convenio firmado
      </UploadButton>
    </Form>
  )
}

export default withForm(SubmissionAgreementForm)
