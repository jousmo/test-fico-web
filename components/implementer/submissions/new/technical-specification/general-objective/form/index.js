import { withForm } from "../../../../../../../helpers/withForm"
import { Form } from "antd"
import { IndicatorsField } from "../../../../indicators-field"

function GeneralObjectiveForm({data, onChange}) {
  const onIndicatorsChange = newIndicators => {
    onChange && onChange({
      currentTarget: {
        id: "generalObjectiveIndicators",
        value: newIndicators
      }
    })
  }

  return (
    <Form
      name="project-details"
      layout="vertical">
      <Form.Item>
        {data?.Submission?.generalObjective}
      </Form.Item>
      <Form.Item label="Indicadores">
        <IndicatorsField
          defaultValue={data?.Submission?.generalObjectiveIndicators}
          onChange={onIndicatorsChange} />
      </Form.Item>
    </Form>
  )
}

export default withForm(GeneralObjectiveForm)
