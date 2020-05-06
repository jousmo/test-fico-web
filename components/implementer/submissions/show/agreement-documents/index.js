import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../contexts/implementer/submissions/show"
import AgreementDocuments from "./documents"

export function AgreementDocumentsContainer() {
  const {
    loading,
    error,
    data
  } = useContext(ImplementerSubmissionContext)

  return (
    <Section title="Documentos de convenio">
      <AgreementDocuments
        data={data?.Submission}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
