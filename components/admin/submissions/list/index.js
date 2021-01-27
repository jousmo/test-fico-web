import { SearchField, Section } from "../../../shared"
import { useContext, useState } from "react"
import {
  AdminSubmissionContext
} from "../../../../contexts/admin/submissions/show"
import SubmissionsListingTable from "./table"
import { shared } from "../../../../helpers/selectOptions/shared"

export function SubmissionsListing() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  const { submissionStatusOptions } = shared
  const submissions = data?.Submissions?.filter(submission => {
    return submissionStatusOptions?.findIndex(e => e.value === submission.status) < 9
  })

  const [state, setState] = useState(false)

  const onSearch = value => {
    if (!value) {
      setState(false)
      return
    }

    const filter = submissions?.filter(submission =>
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
        data={state ? state : submissions}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
