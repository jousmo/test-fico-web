import { Section } from "../../../../shared"
import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../contexts/implementer/submissions/show"
import AgreementDocumentsForm from "./form"

export function AgreementDocuments() {
  const {
    loading,
    error,
    data,
    client
  } = useContext(ImplementerSubmissionContext)

  return (
    <Section title="Documentos de convenio">
      <AgreementDocumentsForm
        data={data?.Submission}
        error={error}
        isLoading={loading}
        client={client}
      />
    </Section>
  )
}
