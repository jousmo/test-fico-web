import { Section } from "../../../../../components/shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import SubmissionObjectives from "./objectives"

export function GeneralInformation() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <Section title="Información general">
      <SubmissionObjectives
        data={data?.SubmissionDetails}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
