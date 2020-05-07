import { withForm } from "../../../../../../helpers/withForm"
import { Button, Descriptions } from "antd"
import { DateField, UploadButton } from "../../../../../shared"
import { getSelectValue } from "../../../../../../helpers/getSelectValue"

function SubmissionAgreementForm({ isSaveHidden, data, onChange, onSave }) {

  const onDateChange = dateObject => {
    const newSignDate = getSelectValue(dateObject)
    onChange(newSignDate)
  }

  return (
    <Descriptions>
      <Descriptions.Item span={3}>
        Anexa el convenio firmado
      </Descriptions.Item>
      { data?.Submission?.status === "ON_AGREEMENT" ? (
        <Descriptions.Item label="Fecha de firma de convenio" span={3}>
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
        </Descriptions.Item>
      ) : null }
      <Descriptions.Item>
        <UploadButton
          style={{margin: "5px"}}
          disabled={!data?.Submission?.contractSignDate}>
          Subir convenio firmado
        </UploadButton>
      </Descriptions.Item>
    </Descriptions>
  )
}

export default withForm(SubmissionAgreementForm)
