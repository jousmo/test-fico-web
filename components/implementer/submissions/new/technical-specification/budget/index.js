import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer"
import { useContext } from "react"
import { Section } from "../../../../../shared"
import BudgetForm from "./form"
import * as _ from "lodash"

export function Budget() {
  const {
    updateBudget,
    loading,
    review,
    error,
    data,
    hiddenComments
  } = useContext(ImplementerSubmissionContext)

  const onChange = concepts => {
    const newConcepts = Array.from(concepts).map(cleanData)
    updateBudget({ concepts: newConcepts })
  }

  const cleanData = concept => _.omit(concept, ["index", "budgeted"])

  return (
    <Section
      title="Presupuesto"
      fullWidth>
      <BudgetForm
        isLoading={loading}
        error={error}
        data={data}
        review={review}
        onChange={onChange}
        hiddenComments={hiddenComments} />
    </Section>
  )
}
