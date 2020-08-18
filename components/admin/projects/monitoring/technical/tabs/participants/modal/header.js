import { Col, Typography } from "antd"

export function HeaderColumns(){
  return (
    <>
      <Col span={8}>
        <Typography.Text strong>Actividad</Typography.Text>
      </Col>
      <Col span={6}>
        <Typography.Text strong>Hombres</Typography.Text>
      </Col>
      <Col span={6}>
        <Typography.Text strong>Mujeres</Typography.Text>
      </Col>
      <Col span={4}>
        <Typography.Text strong>Total</Typography.Text>
      </Col>
    </>
  )
}
