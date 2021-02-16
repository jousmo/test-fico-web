import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import SpecificObjectiveForm from "./form"

export function SpecificObjectives() {
  const {
    updateTechnicalSpecification,
    readOnly,
    loading,
    review,
    error,
    data,
    hiddenComments
  } = useContext(ImplementerSubmissionContext)

  const onChange = newSpecificObjectives => {
    const newData = {}
    newData.specificObjectives = newSpecificObjectives

    updateTechnicalSpecification(newData)
  }

  return (
    <SpecificObjectiveForm
      isLoading={loading}
      readOnly={readOnly}
      error={error}
      data={data}
      review={review}
      onChange={onChange}
      hiddenComments={hiddenComments} />
  )
}
