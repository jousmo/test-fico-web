import { Section } from "../../../shared"
import LegalDocumentsForm from "./form"
import { useContext } from "react"
import { ImplementerProfileContext } from "../../../../contexts/implementer/profile"

export function LegalDocuments() {
  const {
    data,
    error,
    loading,
    addDocument,
    isGovernment,
    removeDocument
  } = useContext(ImplementerProfileContext)

  return (
    <Section title="3. Documentos legales">
      <LegalDocumentsForm
        error={error}
        isLoading={loading}
        data={data?.Implementer}
        addDocument={addDocument}
        removeDocument={removeDocument}
        isGovernment={isGovernment()} />
    </Section>
  )
}
