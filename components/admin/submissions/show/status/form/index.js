import { withForm } from "../../../../../../helpers/withForm"
import { Button, Form } from "antd"
import moment from "moment"
import {
  getReadableValue
} from "../../../../../../helpers/selectOptions/getReadableValue"
import {
  submissionStatusOptions
} from "../../../../../../helpers/selectOptions/shared/submission-status"
import { getSelectValue } from "../../../../../../helpers/getSelectValue"
import { DateField, Visibility } from "../../../../../shared"

function StatusForm({ data, onChange, onSave }) {

  const onDateChange = dateObject => {
    const newDeadline = getSelectValue(dateObject)
    onChange(newDeadline)
  }

  return (
    <Form
      layout="horizontal"
      name="submission-status">
      <Form.Item style={{marginBottom: "10px"}}>
        {getReadableValue(submissionStatusOptions, data?.status)}
      </Form.Item>
      <Form.Item
        label="Fecha de estatus"
        style={{marginBottom: "5px"}}>
        {moment(data?.statusChangedAt).format("MM/DD/YYYY HH:MM")}
      </Form.Item>
      <Visibility visible={data?.deadline !== undefined}>
        <Form.Item
          label="Fecha límite de revisión">
          <DateField
            id="deadline"
            defaultValue={data?.deadline}
            onChange={onDateChange} />
          &nbsp;
          <Button onClick={onSave}>Guardar</Button>
        </Form.Item>
      </Visibility>
    </Form>
  )
}

export default withForm(StatusForm)
