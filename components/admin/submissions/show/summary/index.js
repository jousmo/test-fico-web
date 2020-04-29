import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import SummaryHeading from "./heading"
import SummaryBody from "./body"
import "./style.sass"

export function SubmissionSummary() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <div className="fico submission summary">
      <SummaryHeading data={data?.Submission} isLoading={loading} />
      <SummaryBody
        data={data?.Submission}
        error={error}
        isLoading={loading} />
    </div>
  )
}
