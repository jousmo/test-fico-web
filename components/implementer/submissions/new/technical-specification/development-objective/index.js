import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import DevelopmentObjectiveForm from "./form"
import { Section } from "../../../../../shared"
import { FieldLabel } from "../../../../../shared"
import {
  DevelopmentObjectiveText
} from "../../general-information/development-objectives/form/development-objective-text"
import { Button } from "antd"
import { technicalSpecificationExport } from "../../../../../admin/projects/show/attachments/documents/helpers"

export function DevelopmentObjective({ admin }) {
  const {
    updateTechnicalSpecification,
    readOnly,
    loading,
    review,
    error,
    data,
    hiddenComments
  } = useContext(ImplementerSubmissionContext)

  const onChange = ({ currentTarget: { id, value } }) => {
    const newData = {}
    newData[id] = value

    updateTechnicalSpecification(newData)
  }

  return (
    <Section
      extra={admin && <Button onClick={() => technicalSpecificationExport(data.TechnicalSpecification)}>Exportar</Button>}
      title={
        <FieldLabel
          helpText={<DevelopmentObjectiveText />}>
          Objetivo de desarrollo
        </FieldLabel>
      }>
      <DevelopmentObjectiveForm
        isLoading={loading}
        readOnly={readOnly}
        error={error}
        data={data}
        review={review}
        onChange={onChange}
        hiddenComments={hiddenComments} />
    </Section>
  )
}
