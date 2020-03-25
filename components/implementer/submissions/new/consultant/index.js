import { useContext } from "react"
import { ImplementerSubmissionContext } from "../../../../../contexts/implementer/submissions/new"
import { Section } from "../../../../shared"
import ConsultantForm from "./form"

export function Consultant() {
  const {
    updateGeneralInformation,
    loading,
    error,
    data,
    hasConsultant
  } = useContext(ImplementerSubmissionContext) 

  const onChange = ({ currentTarget: { id, value } }) => {
    let newData = {}
    newData[id] = value

    if(id !== "hasConsultant") {
      newData = { consultant: { ...data.Submission.consultant, ...newData } }
    }

    updateGeneralInformation(newData)
  }

  return (
    <Section title="2. Consultor">
      <ConsultantForm
        isLoading={loading}
        error={error}
        data={data}
        onChange={onChange}
        hasConsultant={hasConsultant()} />
    </Section>
  )
}
