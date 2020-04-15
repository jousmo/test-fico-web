import GeneralObjectiveForm from "./form"
import { Section } from "../../../../../shared"
import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new/context"

export function GeneralObjective() {
  const {
    updateTechnicalSpecification,
    loading,
    error,
    data
  } = useContext(ImplementerSubmissionContext)

  return (
    <Section title="Objetivo general">
      <GeneralObjectiveForm
        isLoading={loading}
        error={error}
        data={data} />
    </Section>
  )
}
