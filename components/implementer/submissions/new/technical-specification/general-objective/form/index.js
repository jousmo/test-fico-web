import { withForm } from "../../../../../../../helpers/withForm"
import { Form } from "antd"
import { IndicatorsField } from "../../../../indicators-field"
import { useAuth } from "../../../../../../../contexts/auth"

function GeneralObjectiveForm({ data, onChange, hiddenComments, review }) {
  const { user } = useAuth()
  const onIndicatorsChange = newIndicators => {
    onChange && onChange({
      currentTarget: {
        id: "generalObjectiveIndicators",
        value: newIndicators
      }
    })
  }

  const readOnly = data?.Submission?.state === "PROJECT" ||
    (user?.claims?.role === "IMPLEMENTER" && data?.Submission?.status.includes("REVIEW"))

  return (
    <Form
      name="project-details"
      layout="vertical">
      <Form.Item>
        {data?.Submission?.generalObjective}
      </Form.Item>
      <Form.Item label="Indicadores">
        <IndicatorsField
          review={review}
          defaultValue={data?.Submission?.generalObjectiveIndicators}
          indicatorType="GENERAL_INDICATOR"
          limitDates={[data?.Submission?.startDate, data?.Submission?.endDate]}
          readOnly={readOnly}
          onChange={onIndicatorsChange}
          hiddenComments={hiddenComments}/>
      </Form.Item>
    </Form>
  )
}

export default withForm(GeneralObjectiveForm)
