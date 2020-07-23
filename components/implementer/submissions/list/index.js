import { SearchField, Section } from "../../../shared"
import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../contexts/implementer/submissions/show"
import SubmissionsListingTable from "./table"

export function SubmissionsListing() {
  const {
    loading,
    router,
    error,
    data
  } = useContext(ImplementerSubmissionContext)

  return (
    <Section style={{padding: 0}}>
      <SearchField />
      <SubmissionsListingTable
        data={data?.Submissions}
        error={error}
        router={router}
        isLoading={loading} />
    </Section>
  )
}
