import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer"
import { useContext } from "react"
import { Section } from "../../../../../shared"
import BudgetTable from "./table"


export function Budget() {
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
    <Section title="Objetivo de desarrollo">
      <BudgetTable
        isLoading={loading}
        error={error}
        data={data}
        onChange={onChange} />
    </Section>
  )
}
