import { withForm } from "../../../../../../../helpers/withForm"
import { FieldLabel } from "../../../../../../shared/field-label";
import { Table } from "antd"
import Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
import ActivityTooltip from "./activityTooltip"
import ActivityBox from "./activityBox"

function ActivitiesTable({ data }) {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const currentYear = new Date().getFullYear()

  const activities = data?.Submission?.specificObjectives?.map(({ activities }) => activities).flat()

  const getLabel = (record, index) => {
    const activity = activities[index]

    return (
      <FieldLabel helpText={<ActivityTooltip activity={activity} />}>{record.activity}</FieldLabel>
    )
  }

  const dataSource = activities[0] && activities.map((activity, index) => {
    let result = {
      key: index,
      activity: `Actividad ${index + 1}`
    }
    const range = moment.range(activity.months[0], activity.months[1]);
    const months = Array.from(range.by('month')).map(m => m.format('YYYYM'))
    months.forEach(month => (
      result[month] = <ActivityBox />
    ))
    return result
  })

  return (
    <Table dataSource={dataSource} pagination={false} scroll={{ x: true }}>
      <Table.Column
        dataIndex="activity"
        render={(text, record, index) => getLabel(record, index)}
        title="Actividad" />
      {months.map((month, index) => (
        <Table.Column
          key={index}
          dataIndex={`${currentYear}${index + 1}`}
          title={`${month} ${currentYear}`} />
      ))}
    </Table>
  )
}

export default withForm(ActivitiesTable)