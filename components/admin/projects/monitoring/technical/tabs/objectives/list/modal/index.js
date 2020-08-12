import {
  Col, Divider, Form, InputNumber,
  Modal, Row, Tag, Typography
} from "antd"
import { useEffect } from "react"
import { DateField, UploadButton } from "../../../../../../../../shared"
import { getSelectValue } from "../../../../../../../../../helpers"
import { ParticipantsField } from "./participants-field"

export function ObjectivesModal({ edit, onCancel, ...props }) {
  const [form] = Form.useForm()

  useEffect(() => {
    if(edit) {
      form.setFieldsValue(edit)
    }
  }, [edit])

  const onOk = async () => {
    try {
      const values = await form.getFieldsValue()
    }
    catch(e) {
      console.error(e)
    }
  }

  const onClose = () => {
    form.resetFields()
    onCancel()
  }

  const type = edit?.key?.includes("A") ? "ACTIVITY" : "INDICATOR"

  return (
    <Modal
      cancelText="Cancelar"
      onOk={onOk}
      width={600}
      onCancel={onClose}
      okText="Guardar"
      {...props}>
      <Form
        form={form}
        className="fico technical-monitoring objectives-form"
        name="indicator-form">
        <Row gutter={[10, 8]} justify="start">
          <Col span={24}>
            <Tag color="gold">{edit?.title}</Tag>
          </Col>
          <Col span={24}>
            <Typography.Text>{edit?.description}</Typography.Text>
          </Col>
          <Col span={24}>
            <Form.Item
              getValueFromEvent={getSelectValue}
              style={{ marginBottom: "0" }}
              id="dateApplied"
              name="dateApplied">
              <DateField
                bordered={false}
                style={{ width: "15rem" }}
                placeholder="Selecciona fecha de realización"
                size="small"/>
            </Form.Item>
          </Col>
          <Divider
            plain
            orientation="left"
            style={{ margin: "10px 0" }}>
            Resultados
          </Divider>
          <Col span={7}>
            <Form.Item label="Meta" style={{ marginBottom: "0" }}>
              {edit?.goal}
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              label="Reales"
              id="attendance"
              name="attendance"
              style={{ marginBottom: "0" }}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Cumplimiento" style={{ marginBottom: "0" }}>
              50%
            </Form.Item>
          </Col>
          <Divider
            plain
            orientation="left"
            style={{ margin: "10px 0" }}>
            Participantes
          </Divider>
          <Col span={24}>
            <Form.Item
              id="participants"
              name="participants">
              <ParticipantsField type={type} />
            </Form.Item>
          </Col>
          <Divider
            plain
            orientation="left"
            style={{ margin: "10px 0" }}>
            Indicador
          </Divider>
          <Col span={24}>
            <Form.Item
              label="Indicador"
              style={{ marginBottom: "0" }}>
              <Typography.Text strong>
                {edit?.indicador}
              </Typography.Text>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Medio de verificación"
              style={{ marginBottom: "0" }}>
              <Typography.Text strong>
                {edit?.meansOfVerification}
              </Typography.Text>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              id="verificationDocument"
              name="verificationDocument"
              style={{ marginBottom: "0" }}>
              <UploadButton>Subir medio de verificación</UploadButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
