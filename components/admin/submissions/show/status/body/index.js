import { withForm } from "../../../../../../helpers/withForm"
import { Descriptions } from "antd"
import moment from "moment"
import {
  getReadableValue
} from "../../../../../../helpers/selectOptions/getReadableValue"
import {
  statusOptions
} from "../../../../../../helpers/selectOptions/shared/statusOptions"

function StatusBody({ status }) {
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
        <Descriptions.Item label={<small>Fecha límite de revisión</small>}>
          <small>
            {moment(status?.limit).format("MM/DD/YYYY HH:MM")}
          </small>
        </Descriptions.Item>
      ) : null}
    </Descriptions>
  )
}

export default withForm(StatusBody)
