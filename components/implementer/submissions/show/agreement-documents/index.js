import { Section } from "../../../../shared"
import { useContext } from "react"
import { ImplementerSubmissionContext } from "../../../../../contexts/implementer/submissions/show"
import AgreementDocumentsForm from "./form"

export function AgreementDocuments() {
  const { data, error, loading, ...props } = useContext(ImplementerSubmissionContext)

  return (
    <Section title="Documentos de convenio">
      <AgreementDocumentsForm
        data={data?.SubmissionDetails}
        error={error}
        isLoading={loading}
        {...props}
      />
    </Section>
  )
}
