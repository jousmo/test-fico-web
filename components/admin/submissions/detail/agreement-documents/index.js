import { Section } from "../../../../../components/shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/detail"
import AgreementDocuments from "./documents"

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
