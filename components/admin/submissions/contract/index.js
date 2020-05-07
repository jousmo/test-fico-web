import { Section } from "../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../contexts/admin/submissions/show"
import ContractsTable from "./table"

export function Contracts() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <Section>
      <ContractsTable
        data={data?.Submission}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
