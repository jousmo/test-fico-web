import { Button, Table, Tooltip } from "antd"
import { Section } from "../../../../../../shared/section"
import moment from "moment"
import { capitalize } from "lodash"
import { ScheduleBox } from "./box"
import { CommentOutlined, QuestionCircleFilled } from "@ant-design/icons"
import { getColor, getMonths, getCompliance } from "./helpers"
moment.locale("es")

export function MonitoringSchedule({ data, dateFilter }) {
  const monthsFull = moment.months()
  let months = null

  if (dateFilter?.length > 0) {
    months =  getMonths(dateFilter)
  } else {
    months = monthsFull
  }

  const activities = data?.Submission?.specificObjectives?.reduce(
    (prev, { activities }) => activities ? prev.concat(activities) : null, []
  ) || []

  const dataSource = activities?.map(activity => {
    const obj = {}

    for (const month of months) {
      const filterSchedule = activity?.schedules?.filter(schedule => moment(schedule?.scheduledAt).format("MMMM") === month)
      if (filterSchedule?.length) {
        const color = getColor(filterSchedule)
        obj[month] = <ScheduleBox color={color} />
      }
    }

    return {
      key: activity?.id,
      activity: activity?.title,
      compliance: getCompliance(activity),
      ...obj
    }
  })

  return (
    <div style={{ marginTop: "-2.5rem"}}>
      <Section title="Cronograma" style={{ margin: 0 }}>
        <Table
          className="fico table-schedule"
          dataSource={dataSource}
          size="small"
          pagination={false}
          scroll={{ x: true }}>

          <Table.Column
            className="activity"
            dataIndex="activity"
            title="Actividad"
            render={(t, row) =>
              <Tooltip title={`Cumplimiento del ${row.compliance}%`} placement="right">
                <span>{t} <QuestionCircleFilled /></span>
              </Tooltip>
            } />

          <Table.Column
            className="comment"
            align="center"
            render={(t, row) =>
              <Button
                icon={<CommentOutlined />}
                onClick={null}
                shape="circle" />
            } />

          {monthsFull?.map((month, index) => {
            return (
              <Table.Column
                className="months"
                key={index}
                dataIndex={month}
                title={capitalize(month)}
                align="center" />
            )
          })}
        </Table>
      </Section>
    </div>
  )
}
