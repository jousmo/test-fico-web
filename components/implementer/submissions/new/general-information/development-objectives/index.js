import DevelopmentObjectivesForm from "./form"
import { useContext } from "react"
import { ImplementerSubmissionContext } from "../../../../../../contexts/implementer/submissions/new/context"
import { Section } from "../../../../../shared"

export function DevelopmentObjectives() {
  const {
    updateGeneralInformation,
    loading,
    review,
    error,
    data,
    hiddenComments
  } = useContext(ImplementerSubmissionContext)

  const onChange = ({ currentTarget: { id, value } }) => {
    const newData = {}
    newData[id] = value

    updateGeneralInformation(newData)
  }

  return (
    <Section title="3. Objetivos de desarrollo">
      <DevelopmentObjectivesForm
        isLoading={loading}
        error={error}
        data={data}
        review={review}
        onChange={onChange}
        hiddenComments={hiddenComments} />
    </Section>
  )
}
