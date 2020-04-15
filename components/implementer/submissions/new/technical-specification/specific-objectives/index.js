import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new/context"
import SpecificObjectiveForm from "./form"

export function SpecificObjectives() {
  const {
    updateTechnicalSpecification,
    loading,
    error,
    data
  } = useContext(ImplementerSubmissionContext)

  const onChange = newSpecificObjectives => {
    const newData = {}
    newData.specificObjectives = newSpecificObjectives

    updateTechnicalSpecification(newData)
  }

  return (
    <SpecificObjectiveForm
      isLoading={loading}
      error={error}
      data={data}
      onChange={onChange} />
  )
}
