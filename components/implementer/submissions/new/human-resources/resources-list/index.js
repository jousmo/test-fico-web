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
    data,
    hiddenComments
  } = useContext(ImplementerSubmissionContext)

  const onChange = concepts => {
    updateHumanResources(concepts)
  }

  return (
    <Section fullWidth>
      <HumanResourcesTable
        isLoading={loading}
        error={error}
        data={data}
        onChange={onChange}
        hiddenComments={hiddenComments} />
    </Section>
  )
}
