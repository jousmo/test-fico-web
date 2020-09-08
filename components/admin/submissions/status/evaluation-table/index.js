import { withForm } from "../../../../../helpers/withForm"
import { Divider, Typography, Row, Col } from "antd"
import { EvaluationActionButtons } from "./action-buttons"

function EvaluationTable({ data, save }) {
  return (
    <Row justify="space-between" align="middle">
      {data?.map(({ id, name, technicalOpinion }) => (
        <>
          <Col span={20}>
            <Typography.Text strong>{name}</Typography.Text>
            <br />
            <Typography.Text>{technicalOpinion}</Typography.Text>
          </Col>
          <Col>
            <EvaluationActionButtons save={save} id={id} />
          </Col>
          <Divider />
        </>
      ))}
    </Row>
  )
}

export default withForm(EvaluationTable)
