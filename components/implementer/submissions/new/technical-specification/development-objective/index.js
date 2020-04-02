import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new/context"
import DevelopmentObjectiveForm from "./form"
import { Section } from "../../../../../shared"

export function DevelopmentObjective() {
  const {
    updateTechnicalSpecification,
    loading,
    error,
    data
  } = useContext(ImplementerSubmissionContext)

  const onChange = ({ currentTarget: { id, value } }) => {
    const newData = {}
    newData[id] = value

    updateTechnicalSpecification(newData)
  }

  return (
    <Section title="3. Objetivos de desarrollo">
      <DevelopmentObjectiveForm
        isLoading={loading}
        error={error}
        data={data}
        onChange={onChange} />
    </Section>
  )
}
