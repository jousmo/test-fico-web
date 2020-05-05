import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new/context"
import { Section } from "../../../../../shared"
import HumanResourcesTable from "./table"

export function ResourcesList() {
  const {
    updateHumanResources,
    loading,
    error,
    data
  } = useContext(ImplementerSubmissionContext)

  const onChange = newConcepts => {
    updateHumanResources({ concepts: newConcepts })
  }

  return (
    <Section>
      <HumanResourcesTable
        isLoading={loading}
        error={error}
        data={data}
        onChange={onChange} />
    </Section>
  )
}