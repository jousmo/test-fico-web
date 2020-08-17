import { Button, Col, Row } from "antd"
import { EyeFilled } from "@ant-design/icons/lib"
import {
  implementer,
  getReadableValue
} from "../../../../../../../../helpers/selectOptions"

export function ParticipantRow({ item = {} }){
  const {
    men,
    women,
    total,
    ageRange
  } = item

  const { submission: { ageRanges } } = implementer

  return (
    <Row align="middle">
      <Col span={8} />
      <Col span={4}>{men}</Col>
      <Col span={4}>{women}</Col>
      <Col span={3}>{total}</Col>
      <Col span={4}>{getReadableValue(ageRanges, ageRange)}</Col>
      <Col span={1}>
        <Button
          ghost
          shape="circle"
          icon={<EyeFilled />}
          type="primary" />
      </Col>
    </Row>
  )
}
