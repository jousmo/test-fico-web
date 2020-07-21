import { SearchField, Section } from "../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../contexts/admin/submissions/show"
import ListByStatusTable from "./table"
import EvaluationTable from "./evaluation-table"

export function ListByStatus({ status }) {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  let table = (
    <ListByStatusTable
      data={data?.submissions}
      error={error}
      isLoading={loading} />
  )

  if (status === "ON_COUNCIL" || status === "ON_COMMITTEE"){
    table = (
      <EvaluationTable
        data={data?.submissions}
        error={error}
        isLoading={loading} />
    )
  }

  return (
    <Section>
      <SearchField />
      {table}
    </Section>
  )
}
