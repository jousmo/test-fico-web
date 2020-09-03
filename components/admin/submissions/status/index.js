import { SearchField, Section } from "../../../shared"
import { useContext, useState } from "react"
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

  const [state, setState] = useState(false)

  const onSearch = (value) => {
    const filter = data?.Submissions?.filter(submission => submission.name.toLowerCase().includes(value.toLowerCase()))

    if (!value) setState(false)
    setState(filter)
  }

  return (
    <Section>
      <SearchField onSearch={onSearch}/>
      <ListByStatusTable
        data={state ? state : data?.Submissions}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
