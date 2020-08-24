import { Col, Divider, Typography, Row } from "antd"

export function PDFSignatures(){
  return (
    <Row
      gutter={[20, 8]}
      className="signatures"
      justify="center">
      <Col span={6}>
        <Typography.Text>Presenta</Typography.Text>
        <Divider />
        <Typography.Text>Director de la región</Typography.Text>
      </Col>
      <Col span={6}>
        <Typography.Text>Revisa</Typography.Text>
        <Divider />
        <Typography.Text>UPV/UFI</Typography.Text>
      </Col>
      <Col span={6}>
        <Typography.Text>Autoriza</Typography.Text>
        <Divider />
        <Typography.Text>Director estatal</Typography.Text>
      </Col>
    </Row>
  )
}
