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

function StatusBody({ isSaveHidden, onChange, onSave, status }) {

  const onDateChange = dateObject => {
    const newLimitDate = getSelectValue(dateObject)
    onChange(newLimitDate)
  }

  return (
    <Descriptions>
      <Descriptions.Item span={3}>
        {getReadableValue(statusOptions, status?.value)}
      </Descriptions.Item>
      <Descriptions.Item label={<small>Fecha de estatus</small>}>
        <small>
          {moment(status?.date).format("MM/DD/YYYY HH:MM")}
        </small>
      </Descriptions.Item>
      {status?.limit ? (
        <>
          <Descriptions.Item label={<small>Fecha límite de revisión</small>}>
            &nbsp;
            <DateField
              id="limit"
              defaultValue={status?.limit}
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

export default withForm(StatusBody)
