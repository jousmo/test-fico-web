import { Section } from "../../../../shared"
import { useContext } from "react"
import { AdminSubmissionContext } from "../../../../../contexts/admin/submissions/show"
import AgreementDocumentsForm from "./form"

export function AgreementDocuments() {
  const { data, ...props } = useContext(AdminSubmissionContext)

  return (
    <Section title="Documentos de convenio">
      <AgreementDocumentsForm
        data={data?.Submission}
        {...props}/>
    </Section>
  )
}
