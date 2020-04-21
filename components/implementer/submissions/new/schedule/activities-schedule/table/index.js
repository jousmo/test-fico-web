import { withForm } from "../../../../../../../helpers/withForm"
import { Table } from "antd"
import { FieldLabel } from "../../../../../../shared/field-label";
import ActivityTooltip from "./activityTooltip"
import ActivityBox from "./activityBox"

function ActivitiesTable({ data }) {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const currentYear = new Date().getFullYear()

  const activities = data?.Submission?.specificObjectives?.activities || []

  const getLabel = (record) => {
    const activity = activities.find(element => element.name === record.activity)

    return (
      <FieldLabel helpText={<ActivityTooltip activity={activity} />}>{record.activity}</FieldLabel>
    )
  }

  const columns = [
    {
      title: 'Actividad',
      dataIndex: 'activity',
      key: 'activity',
      render: (text, record) => getLabel(record)
    },
  ].concat(months.map(month => ({
      title: `${month} ${currentYear}`,
      dataIndex: month,
      key: month,
  })))

  const dataSource = activities.map(activity => {
    let result = {
      key: activity.name,
      activity: activity.name
    }
    activity.months.forEach(month => (
      result[month.substring(0,3)] = <ActivityBox />
    ))
    return result
  })

  return <Table dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: true }} />;
}

export default withForm(ActivitiesTable)