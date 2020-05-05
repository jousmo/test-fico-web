import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { AgreementDocuments } from "../../../../shared/submission-show"

export function AgreementDocumentsContainer() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <Section title="Documentos de convenio">
      <AgreementDocuments
        data={data?.Submission}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
