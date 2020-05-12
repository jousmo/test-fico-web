import { SearchField, Section } from "../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../contexts/admin/submissions/show"
import ListByStatusTable from "./table"

export function ListByStatus() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <Section>
      <SearchField />
      <ListByStatusTable
        data={data?.allSubmissions}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
