import { Col, Typography } from "antd"

export function HeaderColumns(){
  return (
    <>
      <Col span={8}>
        <Typography.Text strong>Nivel educación / Prevención</Typography.Text>
      </Col>
      <Col span={4}>
        <Typography.Text strong>Hombres</Typography.Text>
      </Col>
      <Col span={4}>
        <Typography.Text strong>Mujeres</Typography.Text>
      </Col>
      <Col span={3}>
        <Typography.Text strong>Total</Typography.Text>
      </Col>
      <Col span={4}>
        <Typography.Text strong>Rango de edad</Typography.Text>
      </Col>
      <Col span={1} />
    </>
  )
}
