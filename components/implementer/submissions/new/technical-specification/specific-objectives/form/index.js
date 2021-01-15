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
import { useAuth } from "../../../../../../../contexts/auth"

export default function SpecificObjectiveForm({
  data,
  onChange,
  error,
  isLoading,
  hiddenComments,
  review
}) {
  const { user } = useAuth()
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

  const specificObjectives = data?.Submission?.specificObjectives?.sort((a, b) =>
    a.orderIndex - b.orderIndex
  ) || []

  const onSpecificObjectiveItemsChange = (index, type) => (indicators) => {
    const newSpecificObjectives = Array.from(specificObjectives)

    newSpecificObjectives[index][type] = indicators?.map((el, index) => ({ ...el, orderIndex: index + 1 }))

    onChange && onChange(newSpecificObjectives)
  }

  const readOnly = data?.Submission?.state === "PROJECT" ||
    (user?.claims?.role === "IMPLEMENTER" && data?.Submission?.status.includes("REVIEW"))

  return (
    <>
      { specificObjectives?.map((objective, index) =>
        <Section
          title={
            <>
              <FieldLabel
                helpText={<SpecificObjectiveText />}>
                {`Objetivo específico ${objective.orderIndex}`}
              </FieldLabel>
              {!hiddenComments &&
                <CommentButton
                  name={`specificObjective_${objective.orderIndex}`}
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
                review={review}
                onChange={onSpecificObjectiveItemsChange(index, "indicators")}
                indicatorType="SPECIFIC_INDICATOR"
                objectiveIndex={index}
                limitDates={[data?.Submission?.startDate, data?.Submission?.endDate]}
                readOnly={readOnly}
                defaultValue={objective.indicators.sort((a, b) => a.orderIndex - b.orderIndex)}
                hiddenComments={hiddenComments}/>
            </Form.Item>
            <Form.Item label="Actividades">
              <ActivitiesField
                review={review}
                activityType="SPECIFIC_ACTIVITY"
                objectiveIndex={index}
                limitDates={[data?.Submission?.startDate, data?.Submission?.endDate]}
                onChange={onSpecificObjectiveItemsChange(index, "activities")}
                readOnly={readOnly}
                defaultValue={objective.activities.sort((a, b) => a.orderIndex - b.orderIndex)}
                hiddenComments={hiddenComments}/>
            </Form.Item>
          </Form>
        </Section>
      ) }
    </>
  )
}
