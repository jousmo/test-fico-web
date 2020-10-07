import { Section } from "../../../shared"
import ProjectsForm from "./form"
import { ImplementerProfileContext } from "../../../../contexts/implementer/profile"
import { useContext } from "react"

export function Projects() {
  const {
    updateGeneralInformation,
    loading,
    error,
    data
  } = useContext(ImplementerProfileContext)

  const onChange = data => {
    updateGeneralInformation({ projects: data })
  }

  return (
    <Section title="2. Proyectos de implementadora">
      <ProjectsForm
        data={data}
        isLoading={loading}
        error={error}
        onChange={onChange} />
    </Section>
  )
}
