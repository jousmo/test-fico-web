import { Button, Col, Row } from "antd"
import { EyeFilled } from "@ant-design/icons/lib"
import {
  implementer,
  getReadableValue
} from "../../../../../../../../helpers/selectOptions"

export function ParticipantRow({ items = {}, age, onClick }){
  const data = items?.reduce((res, item) => {
    if(item.gender === "M"){
      res.men += item.amount
    } else {
      res.women += item.amount
    }
    res.total += item.amount
    return res
  }, { total: 0, men: 0, women: 0 })

  const { men, women, total } = data || {}

  const { submission: { ageRanges } } = implementer

  return (
    <Row align="middle">
      <Col span={8} />
      <Col span={4}>{men}</Col>
      <Col span={4}>{women}</Col>
      <Col span={3}>{total}</Col>
      <Col span={4}>{getReadableValue(ageRanges, age)}</Col>
      <Col span={1}>
        <Button
          ghost
          onClick={() => onClick(data)}
          shape="circle"
          icon={<EyeFilled />}
          type="primary" />
      </Col>
    </Row>
  )
}
