import { SearchField, Section } from "../../../shared"
import { useContext } from "react"
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

  return (
    <Section style={{padding: 0}}>
      <SearchField />
      <SubmissionsListingTable
        data={data?.Submissions}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
