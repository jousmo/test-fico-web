import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer"
import { useContext } from "react"
import { Section } from "../../../../../shared"
import BudgetForm from "./form"

export function Budget() {
  const {
    updateBudget,
    loading,
    error,
    data
  } = useContext(ImplementerSubmissionContext)

  const onChange = concepts => {
    const newConcepts = Array.from(concepts)
    updateBudget({ concepts: newConcepts })
  }

  return (
    <Section
      title="Presupuesto"
      fullWidth>
      <BudgetForm
        isLoading={loading}
        error={error}
        data={data}
        onChange={onChange} />
    </Section>
  )
}
