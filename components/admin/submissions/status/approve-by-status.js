import { SearchField, Section } from "../../../shared"
import { useContext, useState } from "react"
import {
  AdminSubmissionContext
} from "../../../../contexts/admin/submissions/show"
import EvaluationTable from "./evaluation-table"

export function ApproveByStatus() {
  const {
    readOnly,
    loading,
    error,
    save,
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
      <EvaluationTable
        readOnly={readOnly}
        data={state ? state : data?.Submissions}
        error={error}
        save={save}
        isLoading={loading} />
    </Section>
  )
}
