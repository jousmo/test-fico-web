import { useState, useEffect } from "react"
import { withForm } from "../../../../../helpers/withForm"
import { Divider, Typography, Row, Col } from "antd"
import { EvaluationActionButtons } from "./action-buttons"

function EvaluationTable({ data }) {
  const [state, setState] = useState({ submissions: [] })

  useEffect(() => {
    setState({ submissions: data })
  }, [data])

  const onChange = id => {
    const newSubmissions = [...state.submissions].filter(e => e.id !== id)
    setState({ submissions: newSubmissions })
  }

  return (
    <Row justify="space-between" align="middle">
      {state.submissions.map(({ id, name, technicalOpinion }) => (
        <>
          <Col span={20}>
            <Typography.Text strong>{name}</Typography.Text>
            <br />
            <Typography.Text>{technicalOpinion}</Typography.Text>
          </Col>
          <Col>
            <EvaluationActionButtons id={id} onChange={onChange} />
          </Col>
          <Divider />
        </>
      ))}
    </Row>
  )
}

export default withForm(EvaluationTable)
