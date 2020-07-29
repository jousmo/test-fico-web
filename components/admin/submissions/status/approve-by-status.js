import { SearchField, Section } from "../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../contexts/admin/submissions/show"
import EvaluationTable from "./evaluation-table"

export function ApproveByStatus() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <Section>
      <SearchField />
      <EvaluationTable
        data={data?.submissions}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
