import { Button, Table, Tooltip } from "antd"
import { Section } from "../../../../../../shared/section"
import moment from "moment"
import { capitalize } from "lodash"
import { ScheduleBox } from "./box"
import { CommentOutlined } from "@ant-design/icons"
moment.locale("es")

export function MonitoringSchedule({ data }) {
  const months = moment.months()
  const dataSource = [
    {
      activity: "La 4T hoy en día",
      enero: <ScheduleBox color="green" />,
      febrero: <ScheduleBox color="green" />,
      marzo: <ScheduleBox color="orange" />,
      abril: <ScheduleBox color="red" />,
      mayo: <ScheduleBox color="transparent" />,
      junio: <ScheduleBox color="red" />,
      julio: <ScheduleBox color="red" />,
      agosto: <ScheduleBox color="green" />,
      septiembre: <ScheduleBox color="green" />,
      octubre: <ScheduleBox color="green" />,
      noviembre: <ScheduleBox color="red" />,
      diciembre: <ScheduleBox color="red" />
    },{
      activity: "Seguimos o paramos",
      enero: <ScheduleBox color="red" />,
      febrero: <ScheduleBox color="transparent" />,
      marzo: <ScheduleBox color="transparent" />,
      abril: <ScheduleBox color="green" />,
      mayo: <ScheduleBox color="green" />,
      junio: <ScheduleBox color="orange" />,
      julio: <ScheduleBox color="orange" />,
      agosto: <ScheduleBox color="orange" />,
      septiembre: <ScheduleBox color="green" />,
      octubre: <ScheduleBox color="green" />,
      noviembre: <ScheduleBox color="red" />,
      diciembre: <ScheduleBox color="green" />
    }
  ]

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
              <Tooltip title="Cumplimiento del 90%" placement="right">
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
