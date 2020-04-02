import { withForm } from "../../../../../../../helpers/withForm"
import { Form, Row, Col, Input } from "antd"
import { CompositeField, DeleteButton } from "../../../../../../shared"
import { v4 as uuid } from "uuid"

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

      </Form.Item>
    </Form>
  )
}

export default withForm(DevelopmentObjectiveForm)
