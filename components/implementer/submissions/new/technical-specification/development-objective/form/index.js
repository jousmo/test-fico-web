import { withForm } from "../../../../../../../helpers/withForm"
import { Form } from "antd"
import { IndicatorsField } from "../../../../indicators-field"

function DevelopmentObjectiveForm({ data, onChange, hiddenComments, review }) {
  const onIndicatorsChange = newIndicators => {
    onChange && onChange({
      currentTarget: {
        id: "developmentObjectiveIndicators",
        value: newIndicators
      }
    })
  }

  const readOnly = data?.Submission?.state === "PROJECT"

  return (
    <Form
      name="project-details"
      layout="vertical">
      <Form.Item>
        {data?.Submission?.developmentObjective}
      </Form.Item>
      <Form.Item label="Indicadores">
        <IndicatorsField
          review={review}
          defaultValue={data?.Submission?.developmentObjectiveIndicators}
          indicatorType="DEVELOPMENT_INDICATOR"
          readOnly={readOnly}
          onChange={onIndicatorsChange}
          hiddenComments={hiddenComments}/>
      </Form.Item>
    </Form>
  )
}

export default withForm(DevelopmentObjectiveForm)
