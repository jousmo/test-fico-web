import { Section } from "../../../../../shared"
import ProjectDetailsForm from "./form"
import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new/context"
import { Button } from "antd"
import { generalInformationExport } from "../../../../../admin/projects/show/attachments/documents/helpers"

export function ProjectDetails({ admin }) {
  const {
    updateGeneralInformation,
    readOnly,
    loading,
    error,
    data,
    isCall,
    hiddenComments
  } = useContext(ImplementerSubmissionContext)

  const onChange = data => {
    const newData = {}
    if (Array.isArray(data)){
      data.forEach(e => (
        newData[e.id] = e.value
      ))
    } else {
      const { currentTarget: { id, value }} = data
      newData[id] = value
    }

    updateGeneralInformation(newData)
  }

  return (
    <Section
      extra={admin && <Button onClick={() => generalInformationExport(data?.GeneralInformation)}>Exportar</Button>}
      title="1. Detalles del proyecto">
      <ProjectDetailsForm
        isLoading={loading}
        error={error}
        readOnly={readOnly}
        data={data?.GeneralInformation}
        onChange={onChange}
        isCall={isCall()}
        hiddenComments={hiddenComments} />
    </Section>
  )
}
