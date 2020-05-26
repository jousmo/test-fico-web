import { withForm } from "../../../../../../../helpers/withForm"
import { Form } from "antd"
import { IndicatorsField } from "../../../../indicators-field"

function DevelopmentObjectiveForm({data, onChange}) {
  const onIndicatorsChange = newIndicators => {
    onChange && onChange({
      currentTarget: {
        id: "developmentObjectiveIndicators",
        value: newIndicators
      }
    })
  }

  return (
    <Form
      name="project-details"
      layout="vertical">
      <Form.Item>
        {data?.Submission?.developmentObjective}
      </Form.Item>
      <Form.Item label="Indicadores">
        <IndicatorsField
          defaultValue={data?.Submission?.developmentObjectiveIndicators}
          indicatorType="developmentIndicator"
          onChange={onIndicatorsChange} />
      </Form.Item>
    </Form>
  )
}

export default withForm(DevelopmentObjectiveForm)
