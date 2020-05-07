import { withForm } from "../../../../../../helpers/withForm"
import { Button, Descriptions } from "antd"
import moment from "moment"
import {
  getReadableValue
} from "../../../../../../helpers/selectOptions/getReadableValue"
import {
  statusOptions
} from "../../../../../../helpers/selectOptions/shared/statusOptions"
import { getSelectValue } from "../../../../../../helpers/getSelectValue"
import { DateField } from "../../../../../shared/date-field"

function StatusForm({ data, isSaveHidden, onChange, onSave }) {

  const onDateChange = dateObject => {
    const newDeadline = getSelectValue(dateObject)
    onChange(newDeadline)
  }

  return (
    <Descriptions>
      <Descriptions.Item span={3}>
        {getReadableValue(statusOptions, data?.status)}
      </Descriptions.Item>
      <Descriptions.Item label={<small>Fecha de estatus</small>}>
        <small>
          {moment(data?.statusChangedAt).format("MM/DD/YYYY HH:MM")}
        </small>
      </Descriptions.Item>
      {data?.deadline ? (
        <>
          <Descriptions.Item label={<small>Fecha límite de revisión</small>}>
            &nbsp;
            <DateField
              id="deadline"
              defaultValue={data?.deadline}
              onChange={onDateChange}
              size="small" />
          </Descriptions.Item>
          <Descriptions.Item>
            <Button onClick={onSave} hidden={isSaveHidden}>Guardar</Button>
          </Descriptions.Item>
        </>
      ) : null}
    </Descriptions>
  )
}

export default withForm(StatusForm)
