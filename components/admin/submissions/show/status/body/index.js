import { withForm } from "../../../../../../helpers/withForm"
import { Typography } from "antd"
import moment from "moment"
import {
  getReadableValue
} from "../../../../../../helpers/selectOptions/getReadableValue"
import {
  statusOptions
} from "../../../../../../helpers/selectOptions/shared/statusOptions"

function StatusBody({ status }) {
  return (
    <>
      <Typography.Text>
        {getReadableValue(statusOptions, status?.value)}
      </Typography.Text>
      <br />
      {status?.date ? (
        <Typography.Text type="secondary">
          <small>
            {moment(status?.date).format("MM/DD/YYYY HH:MM")}
          </small>
        </Typography.Text>
      ) : null}
    </>
  )
}

export default withForm(StatusBody)
