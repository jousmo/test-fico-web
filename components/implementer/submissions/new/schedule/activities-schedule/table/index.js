import { withForm } from "../../../../../../../helpers/withForm"
import { Table } from "antd"
import { FieldLabel } from "../../../../../../shared/field-label";
import ActivityTooltip from "./activityTooltip"
import ActivityBox from "./activityBox"

function ActivitiesTable({ data }) {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const currentYear = new Date().getFullYear()

  const activities = data?.Submission?.specificObjectives.map(objective => objective.activities.flat()).flat() || []

  const getLabel = (record, index) => {
    const activity = activities[index]

    return (
      <FieldLabel helpText={<ActivityTooltip activity={activity} />}>{record.activity}</FieldLabel>
    )
  }

  const columns = [
    {
      title: 'Actividad',
      dataIndex: 'activity',
      key: 'activity',
      render: (text, record, index) => getLabel(record, index)
    },
  ].concat(months.map(month => ({
      title: `${month} ${currentYear}`,
      dataIndex: month,
      key: month,
  })))

  const dataSource = activities.map((activity, index) => {
    let result = {
      key: index,
      activity: `Actividad ${index + 1}`
    }
    activity.months.forEach(month => (
      result[month.substring(0,3)] = <ActivityBox />
    ))
    return result
  })

  return <Table dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: true }} />;
}

export default withForm(ActivitiesTable)