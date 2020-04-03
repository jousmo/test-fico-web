import { withForm } from "../../../../../../../helpers/withForm"
import { Form } from "antd"
import { IndicatorsField } from "../../../../indicators-field"

function DevelopmentObjectiveForm({data, onChange}) {
  const onSpecificObjectivesChange = (newObjectives) => {
    onChange && onChange({
      currentTarget: {
        id: "specificObjectives",
        value: newObjectives
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
        <IndicatorsField />
      </Form.Item>
    </Form>
  )
}

export default withForm(DevelopmentObjectiveForm)
