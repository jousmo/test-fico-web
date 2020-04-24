import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new/context"
import ActivitiesTable from "./table"
import { Section } from "../../../../../shared"

export function ActivitiesSchedule() {
  const {
    loading,
    error,
    data
  } = useContext(ImplementerSubmissionContext)

  return (
    <Section>
      <ActivitiesTable
        isLoading={loading}
        error={error}
        data={data} />
    </Section>
  )
}