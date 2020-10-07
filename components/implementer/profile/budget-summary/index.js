import { Section } from "../../../shared"
import { useContext } from "react"
import { ImplementerProfileContext } from "../../../../contexts/implementer/profile"
import BudgetSummaryTable from "./budgetSummaryTable"

export function BudgetSummary() {
  const {
    loading,
    error,
    data
  } = useContext(ImplementerProfileContext)

  return (
    <Section title="3. Resumen de presupuestos anuales">
      <BudgetSummaryTable
        data={data}
        isLoading={loading}
        error={error} />
    </Section>
  )
}
