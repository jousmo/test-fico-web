import { Card } from "antd"
import { ExclamationCircleTwoTone } from "@ant-design/icons"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../contexts/admin/submissions/show"
import { PageHeader } from "../../../shared"
import ProjectScheduleList from "./list"
import "./styles.sass"

export function ProjectSchedule() {
  const {
    loading,
    error,
    data,
    save
  } = useContext(AdminSubmissionContext)

  return (
    <section className="project schedule">
      <PageHeader title="Calendarización" />
      <Card>
        <ExclamationCircleTwoTone />&nbsp;
        Selecciona las actividades que realizarás durante este periodo
      </Card>
      <ProjectScheduleList
        data={data}
        save={save}
        error={error}
        isLoading={loading} />
    </section>
  )
}
