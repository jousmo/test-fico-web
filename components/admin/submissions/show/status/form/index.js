import { withForm } from "../../../../../../helpers/withForm"
import { Form } from "antd"
import moment from "moment"
import {
  getReadableValue
} from "../../../../../../helpers/selectOptions/getReadableValue"
import {
  submissionStatusOptions
} from "../../../../../../helpers/selectOptions/shared/submission-status"
import { getSelectValue } from "../../../../../../helpers/getSelectValue"
import { DateField, Visibility } from "../../../../../shared"

function StatusForm({ data, onSave, readOnly }) {
  const onSaveDate = date => {
    const deadline = getSelectValue(date)
    onSave({ deadline: deadline })
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
        {moment(data?.statusChangedAt).format("DD/MM/YYYY")}
      </Form.Item>
      <Visibility visible={data?.deadline !== undefined}>
        <Form.Item
          label="Fecha límite de revisión">
          <DateField
            id="deadline"
            disabled={readOnly}
            format="DD/MM/YYYY"
            defaultValue={data?.deadline}
            onChange={onSaveDate}/>
        </Form.Item>
      </Visibility>
    </Form>
  )
}

export default withForm(StatusForm)
