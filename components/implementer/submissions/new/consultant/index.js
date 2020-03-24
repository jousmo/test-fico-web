import { useContext } from "react"
import { ImplementerSubmissionContext } from "../../../../../contexts/implementer/submissions/new"
import { Section } from "../../../../shared"
import ConsultantForm from "./form"

export function Consultant() {
  const {
    updateGeneralInformation,
    loading,
    error,
    data
  } = useContext(ImplementerSubmissionContext) 

  const onChange = ({ currentTarget: { id, value } }) => {
    const newData = {}
    newData[id] = value

    updateGeneralInformation(newData)
  }

  return (
    <Section title="2. Consultor">
      <ConsultantForm
        isLoading={loading}
        error={error}
        data={data}
        onChange={onChange} />
    </Section>
  )
}
