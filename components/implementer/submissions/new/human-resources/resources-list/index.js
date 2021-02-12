import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new/context"
import { Section } from "../../../../../shared"
import HumanResourcesTable from "./table"

export function ResourcesList() {
  const {
    loading,
    error,
    data,
    form,
    hiddenComments
  } = useContext(ImplementerSubmissionContext)

  return (
    <Section fullWidth>
      <HumanResourcesTable
        isLoading={loading}
        error={error}
        data={data}
        form={form}
        hiddenComments={hiddenComments} />
    </Section>
  )
}
