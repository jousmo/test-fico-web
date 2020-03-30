
import { Section } from "../../../../../shared"
import ProjectDetailsForm from "./form"
import { useContext } from "react"
import { ImplementerSubmissionContext } from "../../../../../../contexts/implementer/submissions/new/context"

export function ProjectDetails() {
  const {
    updateGeneralInformation,
    loading,
    error,
    data,
    isCall
  } = useContext(ImplementerSubmissionContext)

  const onChange = ({ currentTarget: { id, value } }) => {
    const newData = {}
    newData[id] = value

    updateGeneralInformation(newData)
  }

  return (
    <Section title="1. Detalles del proyecto">
      <ProjectDetailsForm
        isLoading={loading}
        error={error}
        data={data}
        onChange={onChange}
        isCall={isCall()} />
    </Section>
  )
}
