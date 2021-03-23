import DocumentsForm from "./form"
import { useContext } from "react"
import { ImplementerSubmissionContext } from "../../../../../../contexts/implementer/submissions/new/context"
import { Section } from "../../../../../shared"

export function Documents() {
  const {
    updateGeneralInformation,
    readOnly,
    loading,
    review,
    error,
    data,
    hiddenComments
  } = useContext(ImplementerSubmissionContext)

  return (
    <Section title="5. Documentos">
      <DocumentsForm
        isLoading={loading}
        error={error}
        readOnly={readOnly || review}
        data={data?.GeneralInformation}
        onChange={updateGeneralInformation}
        hiddenComments={hiddenComments} />
    </Section>
  )
}
