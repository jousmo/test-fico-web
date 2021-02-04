import { withForm } from "../../../../../../../helpers/withForm"
import { Form } from "antd"
import { IndicatorsField } from "../../../../indicators-field"
import { useAuth } from "../../../../../../../contexts/auth"

function GeneralObjectiveForm({ data, onChange, hiddenComments, review }) {
  const { user } = useAuth()
  const submission = data?.TechnicalSpecification

  const onIndicatorsChange = newIndicators => {
    onChange && onChange({
      currentTarget: {
        id: "generalObjectiveIndicators",
        value: newIndicators
      }
    })
  }

  const readOnly = submission?.state === "PROJECT" ||
    (user?.claims?.role === "IMPLEMENTER" && submission?.status.includes("REVIEW"))

  return (
    <Form
      name="project-details"
      layout="vertical">
      <Form.Item>
        {submission?.generalObjective}
      </Form.Item>
      <Form.Item label="Indicadores">
        <IndicatorsField
          review={review}
          defaultValue={submission?.generalObjectiveIndicators}
          indicatorType="GENERAL_INDICATOR"
          limitDates={[submission?.startDate, submission?.endDate]}
          readOnly={readOnly}
          onChange={onIndicatorsChange}
          hiddenComments={hiddenComments}/>
      </Form.Item>
    </Form>
  )
}

export default withForm(GeneralObjectiveForm)
