import { SearchField, Section } from "../../../shared"
import { useContext } from "react"
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

  return (
    <Section style={{padding: 0}}>
      <SearchField />
      <ProjectListingTable
        data={data?.allSubmissions}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
