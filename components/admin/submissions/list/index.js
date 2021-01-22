import { SearchField, Section } from "../../../shared"
import { useContext, useState } from "react"
import {
  AdminSubmissionContext
} from "../../../../contexts/admin/submissions/show"
import SubmissionsListingTable from "./table"

export function SubmissionsListing() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  const [state, setState] = useState(false)

  const onSearch = value => {
    if (!value) {
      setState(false)
      return
    }

    const filter = data?.Submissions?.filter(submission =>
      `${submission.name} ${submission.implementer?.name}`
        ?.toLowerCase()
        ?.includes(value.toLowerCase())
    )

    setState(filter)
  }

  return (
    <Section style={{padding: 0}}>
      <SearchField onSearch={onSearch} />
      <SubmissionsListingTable
        data={state ? state : data?.Submissions}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
