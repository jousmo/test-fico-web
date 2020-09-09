import { SearchField, Section } from "../../../shared"
import { useContext, useState } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../contexts/implementer/submissions/show"
import SubmissionsListingTable from "./table"

export function SubmissionsListing() {
  const {
    loading,
    error,
    data
  } = useContext(ImplementerSubmissionContext)

  const [state, setState] = useState(false)

  const onSearch = value => {
    if (!value) {
      setState(false)
      return
    }

    const filter = data?.Submissions?.filter(submission =>
      submission.name?.toLowerCase().includes(value.toLowerCase())
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
