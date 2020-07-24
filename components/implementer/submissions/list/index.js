import { SearchField, Section } from "../../../shared"
import { useContext } from "react"
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

  return (
    <Section style={{padding: 0}}>
      <SearchField />
      <SubmissionsListingTable
        data={data?.submissions}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
