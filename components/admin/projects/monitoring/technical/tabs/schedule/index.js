import { Button, Table, Tooltip } from "antd"
import { Section } from "../../../../../../shared/section"
import moment from "moment"
import { capitalize } from "lodash"
import { ScheduleBox } from "./box"
import { CommentOutlined } from "@ant-design/icons"
moment.locale("es")

export function MonitoringSchedule({ data }) {
  const months = moment.months()

  const selectColor = filterSchedule => {
    let color = null
    let counter = 0

    for (const item of filterSchedule) {
      const dateOne = item.scheduledAt?.split("T")[0]
      const dateTwo = item.completedAt?.split("T")[0]

      if (dateTwo === undefined) {
        counter++
        continue
      }

      if (dateOne !== dateTwo) {
        color = "orange"
        break
      }

      color = "green"
    }

    return counter === filterSchedule.length ? "red" : color
  }

  const activities = data?.Submission?.specificObjectives?.reduce(
    (prev, { activities }) => activities ? prev.concat(activities) : null, []
  ) || []

  const dataSource = activities?.map(activity => {
    const obj = {}

    for (const month of months) {
      const filterSchedule = activity?.schedules?.filter(schedule => moment(schedule?.scheduledAt).format("MMMM") === month)
      if (filterSchedule?.length) {
        const color = selectColor(filterSchedule)
        obj[month] = <ScheduleBox color={color} />
      }
    }

    return {
      key: activity?.id,
      activity: activity?.title,
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
            dataIndex="activity"
            title="Actividad"
            render={t =>
              <Tooltip title="Cumplimiento del 0%" placement="right">
                <span>{t}</span>
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

          {months.map((month, index) => {
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
