import { Col, Modal, Row, Typography } from "antd"
import { ExclamationCircleTwoTone } from "@ant-design/icons/lib"

export function ConfirmModal({ title, body, ...props }){
  return (
    <Modal
      width={350}
      maskClosable={false}
      {...props}>
      <Row gutter={[10, 8]}>
        <Col><ExclamationCircleTwoTone twoToneColor="#F9BD55" /></Col>
        <Col>
          <Typography.Text strong>{title}</Typography.Text>
          <br />
          <Typography.Text>{body}</Typography.Text>
        </Col>
      </Row>
    </Modal>
  )
}
