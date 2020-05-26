import {Col, Row, Typography} from "antd"

export function HumanResourcesColumns() {
  return (
    <Row gutter={[10, 8]} justify="start">
      <Col flex="50px" />
      <Col flex="30px" />
      <Col flex="150px">
        <Typography.Text>Puesto</Typography.Text>
      </Col>
      <Col flex="150px">
        <Typography.Text>Nombre</Typography.Text>
      </Col>
      <Col flex="180px">
        <Typography.Text>Funciones</Typography.Text>
      </Col>
      <Col flex="150px">
        <Typography.Text>Supervisa a</Typography.Text>
      </Col>
      <Col flex="80px">
        <Typography.Text>Horas</Typography.Text>
      </Col>
      <Col flex="150px">
        <Typography.Text>Contratación</Typography.Text>
      </Col>
      <Col flex="150px">
        <Typography.Text>Salario</Typography.Text>
      </Col>
      <Col flex="150px">
        <Typography.Text>Prestaciones</Typography.Text>
      </Col>
      <Col flex="150px">
        <Typography.Text>IVA</Typography.Text>
      </Col>
      <Col flex="150px">
        <Typography.Text>Total</Typography.Text>
      </Col>
      <Col flex="250px">
        <Typography.Text>Documentos</Typography.Text>
      </Col>
    </Row>
  )
}
