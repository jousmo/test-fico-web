import { withForm } from "../../../../../../helpers/withForm"
import { Alert, Col, Row, Typography } from "antd"

function SubmissionObjectives({ data, error }) {
  if(!data.Submission || error) {
    return (
      <Alert
        message="Error"
        description="Ha ocurrido un error al cargar los datos de esta sección,
        por favor actualiza la página."
        type="error"
        showIcon />
    )
  }

  const generalObjective = data?.Submission?.generalObjective
  const specificObjectives = data?.Submission?.specificObjectives

  return (
    <div>
      <Row gutter={[10, 8]}>
        <Col span={24}>
          <Typography.Text type="secondary">
            Objetivo General
          </Typography.Text>
        </Col>
        <Col>
          <Typography.Text>
            {generalObjective}
          </Typography.Text>
        </Col>
      </Row>
      <Row gutter={[10, 8]}>
        <Col span={24}>
          <Typography.Text type="secondary">
            Objetivos Especificos
          </Typography.Text>
        </Col>
        <Col>
          <ul>
            { specificObjectives?.map((objective, index) => (
              <li key={index}>
                <Typography.Text>
                  {objective.description}
                </Typography.Text>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  )
}

export default withForm(SubmissionObjectives)
