import { Divider, Modal, Col, Row } from "antd"
import { HeaderColumns } from "./header"
import { decoratedData } from "./helpers"

export function ParticipantsModal({ data, level, ...props }){
  const items = decoratedData(data)

  return (
    <Modal
      footer={null}
      title={`Asistentes Intervención/Prevención-${level}`}
      width={700}
      {...props}>
      <Row gutter={[10, 8]}>
        <HeaderColumns />
        <Divider style={{ margin: "10px 0"}} />
        {Object.keys(items).map(key =>
          <>
            <Col span={8}>{items[key].name}</Col>
            <Col span={6}>{items[key].men}</Col>
            <Col span={6}>{items[key].women}</Col>
            <Col span={4}>{items[key].total}</Col>
            <Divider style={{ margin: "10px 0"}} />
          </>
        )}
      </Row>
    </Modal>
  )
}
