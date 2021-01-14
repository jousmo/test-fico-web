import { withForm } from "../../../../../helpers/withForm"
import { Button, Table } from "antd"
import { CheckSquareTwoTone, EditOutlined } from "@ant-design/icons"
import { Tooltip } from "../../../../shared/tooltip"
import { useState } from "react"
import { ScheduleModal } from "./modal"
import { decoratedData } from "./data-decorator"
import moment from "moment"

function ProjectScheduleList({ data, save }) {
  const [state, setState] = useState({ isModalOpen: false, edit: undefined })
  const dataSource = decoratedData(data)

  const onEdit = row => {
    setState({ isModalOpen: true, edit: row })
  }

  const onCancel = () => {
    setState({ isModalOpen: false, edit: undefined })
  }

  const onSave = (schedules, activityId, objectiveId) => {
    const newObjectives = [ ...data.Submission.specificObjectives ]
    const objectiveIndex = newObjectives?.findIndex(el => el.id === objectiveId)

    const newActivities = [ ...newObjectives[objectiveIndex].activities ]
    const activityIndex = newActivities?.findIndex(el => el.id === activityId)

    newActivities[activityIndex].schedules = schedules
    newObjectives[objectiveIndex].activities = newActivities

    save({ specificObjectives: newObjectives })
    onCancel()
  }

  const getSchedule = row => {
    const { schedules } = row
    if (schedules?.length === 0){
      return ""
    }
    else if (schedules?.length === 1){
      return {
        date: moment(schedules[0].date).format("DD/MM/YYYY H:MMA"),
        place: schedules[0].place
      }
    }
    return { date: "Varios eventos", place: "Varios lugares" }
  }


  return (
    <>
      <ScheduleModal
        edit={state.edit}
        onCancel={onCancel}
        onSave={onSave}
        visible={state.isModalOpen} />
      <Table
        className="activities-list"
        dataSource={dataSource}
        size="middle">
        <Table.Column
          render={(t, row) => row.schedules && <CheckSquareTwoTone />}
          title={<CheckSquareTwoTone />}/>
        <Table.Column
          dataIndex="level"
          title="Nivel" />
        <Table.Column
          title="Resumen narrativo"
          render={text => <Tooltip value={text || ""} length={20}/>}
          sorter={(a, b) => a.description?.localeCompare(b.description)}
          showSorterTooltip={false}
          dataIndex="description" />
          <Table.Column
            title="Fecha y hora"
            render={(t, row) => row.schedules && getSchedule(row).date}
            sorter={(a, b) => getSchedule(a).date?.localeCompare(getSchedule(b).date)}
            showSorterTooltip={false} />
          <Table.Column
            title="Lugar"
            render={(t, row) => row.schedules && getSchedule(row).place}
            sorter={(a, b) => getSchedule(a).place?.localeCompare(getSchedule(b).place)}
            showSorterTooltip={false} />
        <Table.Column
          render={(t, row) =>
            <Button
              icon={<EditOutlined />}
              onClick={() => onEdit(row)}
              shape="circle" />
          } />
      </Table>
    </>
  )
}

export default withForm(ProjectScheduleList)
