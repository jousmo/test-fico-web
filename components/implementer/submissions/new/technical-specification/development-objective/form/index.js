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
      <Row gutter={[10, 8]} justify="start">
        <Col span={24}>{data?.Submission?.developmentObjective}</Col>
      </Row>
    </Form>
  )
}

export default withForm(DevelopmentObjectiveForm)
