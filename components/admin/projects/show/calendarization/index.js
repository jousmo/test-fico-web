import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import CalendarizationList from "./list"

export function Calendarization(){
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <Section title="Calendarización de actividades">
      <CalendarizationList
        data={data}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
