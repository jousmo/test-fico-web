
import { Section } from "../../../shared"
import { useContext } from "react"
import {
  ImplementerProfileContext
} from "../../../../contexts/implementer/profile"
import { GeneralInformationForm } from "./form"

export function GeneralInformation() {
  const {
    updateGeneralInformation,
    loading,
    error,
    data,
    isGovernment
  } = useContext(ImplementerProfileContext)

  const onChange = ({ currentTarget: { id, value } }) => {
    const newData = {}
    newData[id] = value

    updateGeneralInformation(newData)
  }

  return (
    <Section title="1. Información general">
      <GeneralInformationForm
        data={data}
        error={error}
        onChange={onChange}
        isLoading={loading}
        isGovernment={isGovernment()} />
    </Section>
  )
}
