import { Section } from "../../../../../../shared"
import { v4 as uuid } from "uuid"
import { Skeleton, Alert } from "antd"

export default function SpecificObjectiveForm({
  data,
  onChange,
  error,
  isLoading
}) {
  if(isLoading) {
    return <Section><Skeleton active /></Section>
  }

  if(!data || error) {
    return (
      <Section>
        <Alert
          message="Error"
          description="Ha ocurrido un error al cargar los datos de esta sección,
          por favor actualiza la página."
          type="error"
          showIcon />
      </Section>
    )
  }

  const specificObjectives = data?.Submission?.specificObjectives || []

  return (
    <>
      { specificObjectives.map((objective, index) =>
        <Section title={`Objetivo ${index + 1}`} key={uuid()}>
          {objective.description}
        </Section>
      ) }
    </>
  )
}
