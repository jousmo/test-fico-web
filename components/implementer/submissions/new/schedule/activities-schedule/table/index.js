import { withForm } from "../../../../../../../helpers/withForm"
import { FieldLabel } from "../../../../../../shared/field-label"
import { Table } from "antd"
import Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
import ActivityTooltip from "./activityTooltip"
import ActivityBox from "./activityBox"
import { capitalize } from "lodash"

function ActivitiesTable({ data }) {
  const activities = data?.Submission?.specificObjectives?.reduce(
    (prev, { activities }) => activities ? prev.concat(activities) : null, []
  ) || []

  const getLabel = (record, index) => {
    const activity = activities[index]

    return (
      <FieldLabel helpText={<ActivityTooltip activity={activity} />}>
        {record.activity}
      </FieldLabel>
    )
  }

  let monthsColumns = new Set()
  const dataSource = activities.map((activity, index) => {
    let result = {
      key: index,
      activity: `Actividad ${index + 1}`
    }

    const ranges = []
    activity.months?.forEach((range, i) => {
      ranges[i] = moment.range(range.months[0], range.months[1])
    })

    ranges.forEach(range => {
      Array.from(range.by('month')).map(
        m => m.format('YYYYMM')
      ).forEach(month => {
        monthsColumns.add(month)
        result[month] = <ActivityBox />
      })
    })
    return result
  })
  const columns = Array.from(monthsColumns).sort()

  return (
    <Table dataSource={dataSource} pagination={false} scroll={{ x: true }}>
      <Table.Column
        dataIndex="activity"
        render={(text, record, index) => getLabel(record, index)}
        title="Actividad" />

      {columns.map((month, index) => {
        const column =
          capitalize(moment(month, "YYYYMM").format("MMM YYYY"))
        return (
          <Table.Column
            key={index}
            dataIndex={month}
            title={column}/>
        )
      })}
    </Table>
  )
}

export default withForm(ActivitiesTable)
