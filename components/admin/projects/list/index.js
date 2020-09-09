import { SearchField, Section } from "../../../shared"
import { useContext, useState } from "react"
import {
  AdminSubmissionContext
} from "../../../../contexts/admin/submissions/show"
import ProjectListingTable from "./table"

export function ProjectListing() {
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

    const loweredValue = value.toLowerCase()
    const filter = data?.Submissions?.filter(submission =>
      submission.agreementNumber?.toLowerCase().includes(loweredValue) ||
      submission.name?.toLowerCase().includes(loweredValue) ||
      submission.implementer?.name?.toLowerCase().includes(loweredValue)
    )
    setState(filter)
  }

  return (
    <Section style={{padding: 0}}>
      <SearchField onSearch={onSearch} />
      <ProjectListingTable
        data={state ? state : data?.Submissions}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
