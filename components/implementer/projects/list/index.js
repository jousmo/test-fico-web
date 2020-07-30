import { SearchField, Section } from "../../../shared"
import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../contexts/implementer/submissions/show"
import ProjectListingTable from "./table"

export function ProjectListing() {
  const {
    loading,
    error,
    data
  } = useContext(ImplementerSubmissionContext)

  return (
    <Section style={{padding: 0}}>
      <SearchField />
      <ProjectListingTable
        data={data?.Submissions}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
