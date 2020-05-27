import { Section } from "../../../../../../shared"
import { v4 as uuid } from "uuid"
import { Skeleton, Alert, Form } from "antd"
import { IndicatorsField } from "../../../../indicators-field"
import { ActivitiesField } from "../../../../activities-field"
import {
  CommentButton
} from "../../../../../../admin/submissions/review/comment-button"

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

  const onSpecificObjectiveItemsChange = (index, type) => (indicators) => {
    const newSpecificObjectives = Array.from(specificObjectives)

    newSpecificObjectives[index][type] = indicators

    onChange && onChange(newSpecificObjectives)
  }

  return (
    <>
      { specificObjectives.map((objective, index) =>
        <Section
          title={
            <>
              {`Objetivo ${index + 1}`}
              <CommentButton
                name={`specificObjective_${index}`}
                index={index}
                section="specificObjective" />
            </>
          }
          key={uuid()}>
          <Form
            name="specific-objective-indicators"
            layout="vertical">
            <Form.Item>
              {objective.description}
            </Form.Item>
            <Form.Item label="Indicadores">
              <IndicatorsField
                onChange={onSpecificObjectiveItemsChange(index, "indicators")}
                indicatorType="specificIndicator"
                defaultValue={objective.indicators} />
            </Form.Item>
            <Form.Item label="Actividades">
              <ActivitiesField
                onChange={onSpecificObjectiveItemsChange(index, "activities")}
                defaultValue={objective.activities} />
            </Form.Item>
          </Form>
        </Section>
      ) }
    </>
  )
}
