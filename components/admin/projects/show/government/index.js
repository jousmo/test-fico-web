import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import GovernmentList from "./list"

export function Government(){
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <Section title="Gobernanza de la implementadora">
      <GovernmentList
        data={data?.Submission}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
