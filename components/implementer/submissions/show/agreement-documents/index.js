import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../contexts/implementer/submissions/show"
import AgreementDocumentsForm from "./form"

export function AgreementDocuments() {
  const {
    updateDocumentAgreement,
    loading,
    error,
    data
  } = useContext(ImplementerSubmissionContext)

  const onChange = (documentsAgreement) => {
    updateDocumentAgreement(documentsAgreement)
  }

  return (
    <Section title="Documentos de convenio">
      <AgreementDocumentsForm
        data={data?.Submission}
        error={error}
        isLoading={loading}
        onChange={onChange}
      />
    </Section>
  )
}
