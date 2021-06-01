import { Button, Table, Tooltip } from "antd"
import { Section } from "../../../../../../shared/section"
import moment from "moment"
import { ScheduleBox } from "./box"
import { CommentOutlined, QuestionCircleFilled } from "@ant-design/icons"
import { getColor, getMonths, getCompliance } from "./helpers"
import ModalCommentMonitoring from "../../../../../../shared/modal-comment-monitoring"
import { useContext, useState } from "react"
import { AdminSubmissionContext } from "../../../../../../../contexts/admin/submissions/show"
moment.locale("es")

export function MonitoringSchedule({ data, dateFilter }) {
  const { readOnly } = useContext(AdminSubmissionContext)
  const [state, setState] = useState({
    isModalCommentOpen: false,
    activity: { id: "", type: "ACTIVITY" }
  })

  const fullMonths = getMonths(data?.Submission)
  let months = dateFilter?.length ? getMonths(dateFilter) : fullMonths

  const activities = data?.Submission?.specificObjectives?.reduce(
    (prev, { activities }) => activities ? prev.concat(activities) : null, []
  ) || []

  const dataSource = activities?.map(activity => {
    const obj = {}

    months?.forEach(month => {
      const filterSchedule = activity?.schedules?.filter(schedule => moment(schedule?.scheduledAt).format("MMYYYY") === month?.value)
      if (filterSchedule?.length) {
        obj[month.value] = <ScheduleBox color={getColor(filterSchedule)} />
      }
    })


    for (const month of months) {
      const filterSchedule = activity?.schedules?.filter(schedule => moment(schedule?.scheduledAt).format("MMMM") === month)
      if (filterSchedule?.length) {
        const color = getColor(filterSchedule)
        obj[month] = <ScheduleBox color={color} />
      }
    }

    return {
      key: activity?.id,
      id: activity?.id,
      activity: activity?.title,
      compliance: getCompliance(activity),
      ...obj
    }
  })

  const onComment = row => {
    setState({
      ...state,
      isModalCommentOpen: true,
      activity: {
        ...state.activity,
        id: row?.id,
        title: `de la actividad: ${row?.activity}`
      }
    })
  }

  const onCancel = () => {
    setState({ isModalCommentOpen: false, activity: { id: "", type: "ACTIVITY" } })
  }

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
            fixed="left"
            render={(t, row) =>
              <Tooltip title={`Cumplimiento del ${row.compliance}%`} placement="right">
                <span>{t} <QuestionCircleFilled /></span>
              </Tooltip>
            } />

          <Table.Column
            align="center"
            fixed="left"
            render={(t, row) =>
              <Button
                icon={<CommentOutlined />}
                shape="circle"
                onClick={() => onComment(row)}/>
            } />

          {fullMonths?.map((month, index) => {
            return (
              <Table.Column
                key={index}
                dataIndex={month.value}
                title={month.label}
                align="center" />
            )
          })}
        </Table>
      </Section>
      {state.isModalCommentOpen && (
        <ModalCommentMonitoring
          readOnly={readOnly}
          visible={state.isModalCommentOpen}
          data={state.activity}
          onCancel={onCancel}/>
      )}
    </div>
  )
}
