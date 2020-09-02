import { Section } from "../../../../../../shared"
import { v4 as uuid } from "uuid"
import { Skeleton, Alert, Form } from "antd"
import { IndicatorsField } from "../../../../indicators-field"
import { ActivitiesField } from "../../../../activities-field"
import {
  CommentButton
} from "../../../../../../admin/submissions/review/comment-button"
import { FieldLabel } from "../../../../../../shared"
import {
  SpecificObjectiveText
} from "../../../general-information/development-objectives/form/specific-objective-text"

export default function SpecificObjectiveForm({
  data,
  onChange,
  error,
  isLoading,
  hiddenComments
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

  const readOnly = data?.Submission?.state === "PROJECT"

  return (
    <>
      { specificObjectives.map((objective, index) =>
        <Section
          title={
            <>
              <FieldLabel
                helpText={<SpecificObjectiveText />}>
                {`Objetivo específico ${index + 1}`}
              </FieldLabel>
              {!hiddenComments &&
                <CommentButton
                  name={`specificObjective_${index}`}
                  index={index}
                  section="SPECIFIC_OBJECTIVE" />
              }
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
                indicatorType="SPECIFIC_INDICATOR"
                objectiveIndex={index}
                readOnly={readOnly}
                defaultValue={objective.indicators}
                hiddenComments={hiddenComments}/>
            </Form.Item>
            <Form.Item label="Actividades">
              <ActivitiesField
                activityType="SPECIFIC_ACTIVITY"
                objectiveIndex={index}
                onChange={onSpecificObjectiveItemsChange(index, "activities")}
                readOnly={readOnly}
                defaultValue={objective.activities}
                hiddenComments={hiddenComments}/>
            </Form.Item>
          </Form>
        </Section>
      ) }
    </>
  )
}
