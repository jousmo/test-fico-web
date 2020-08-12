import { Row, Col } from "antd"
import {
  getReadableValue,
  implementer
} from "../../../../../../../../../../helpers/selectOptions"
import { DeleteButton } from "../../../../../../../../../shared"

export function ParticipantsItem({ data, onDelete }) {
  const gender = getReadableValue(
    implementer.submission.genderTypes,
    data?.gender
  )

  const type = getReadableValue(
    implementer.submission.attendeeType,
    data?.type
  )

  const preventionLevel = getReadableValue(
    implementer.submission.preventionLevelTypes,
    data?.preventionLevel
  )

  const age = getReadableValue(
    implementer.submission.ageRanges,
    data?.age
  )

  return (
    <Row gutter={[10, 8]} justify="center">
      <Col span={2}>{data?.amount}</Col>
      <Col span={4}>{type}s</Col>
      <Col span={6}>Intervención {preventionLevel}</Col>
      <Col span={4}>{gender}</Col>
      <Col span={4}>{age}</Col>
      <Col span={2}>
        <DeleteButton size="small" onClick={onDelete} />
      </Col>
    </Row>
  )
}
