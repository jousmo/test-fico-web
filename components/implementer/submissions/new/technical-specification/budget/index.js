import { Button } from "antd"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer"
import { useContext } from "react"
import { Section } from "../../../../../shared"
import BudgetForm from "./form"
import * as _ from "lodash"
import { exportBudget } from "./helpers"

export function Budget({ admin }) {
  const {
    updateBudget,
    readOnly,
    loading,
    review,
    error,
    data,
    hiddenComments
  } = useContext(ImplementerSubmissionContext)

  const cleanData = concept => _.omit(concept, ["budgeted"])

  const onChange = concepts => {
    const newConcepts = Array.from(concepts).map(cleanData)
    updateBudget({ concepts: newConcepts })
  }

  return (
    <Section
      extra={admin && <Button onClick={() => exportBudget(data?.Budget)}>Exportar</Button>}
      title="Presupuesto"
      fullWidth>
      <BudgetForm
        readOnly={readOnly}
        isLoading={loading}
        error={error}
        data={data}
        review={review}
        onChange={onChange}
        hiddenComments={hiddenComments} />
    </Section>
  )
}
