import { withForm } from "../../../../../../../helpers/withForm"
import { Form } from "antd"

function GeneralObjectiveForm({data, onChange}) {
  return (
    <Form
      name="project-details"
      layout="vertical">
      <Form.Item>
        {data?.Submission?.generalObjective}
      </Form.Item>
    </Form>
  )
}

export default withForm(GeneralObjectiveForm)
