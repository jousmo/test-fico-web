import { DeleteButton, EditButton } from "../../components/shared"
import { Row, Col } from "antd"

export const actions = (onEdit, onDelete, review) => (text, record, index) => {
  return (
    <Row>
      <Col flex="auto">{text}</Col>
      <Col flex="auto">
        {!review && <DeleteButton onClick={onDelete(index)} />}
        <EditButton onClick={() => onEdit(record, index)} />
      </Col>
    </Row>
  )
}
