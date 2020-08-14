import {
  Col, Divider, Form, InputNumber,
  Modal, Row, Tag, Typography
} from "antd"
import { useEffect } from "react"
import { DateField, UploadButton } from "../../../../../../../../shared"
import { getSelectValue } from "../../../../../../../../../helpers"
import { ParticipantsField } from "./participants-field"

export function ObjectivesModal({ edit, onCancel, onSave, ...props }) {
  const [form] = Form.useForm()

  useEffect(() => {
    if(edit) {
      form.setFieldsValue(edit)
    }
  }, [edit])

  const onOk = async () => {
    try {
      await form.validateFields()
      const values = await form.getFieldsValue()
      values.goal = Number(values.goal)

      onSave(values)
    }
    catch(e) {
      console.error(e)
    }
  }

  const onClose = () => {
    form.resetFields()
    onCancel()
  }

  const onUploadFile = (info, cb) => {
    const { file: { name, response } } = info
    const url = response?.imageUrl
    const newDocument = { name, url }

    form.setFieldsValue({ verificationDocument: newDocument })
  }

  const onRemoveFile = () => {
    form.setFieldsValue({ verificationDocument: undefined })
  }

  const type = edit?.key?.includes("A") ? "ACTIVITY" : "INDICATOR"

  const types = {
    AE: "Actividad",
    IE: "Indicador",
    OE: "Objetivo especifico",
    OD: "Objetivo de desarrollo",
    OG: "Objetivo general"
  }
  const indicatorType = `${types[edit?.key.split("_")[0]]} ${edit?.key.split("_")[1]}`

  const files = []
  if (edit?.verificationDocument){
    files.push(edit.verificationDocument)
  }

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
            <Tag color="gold">{indicatorType}</Tag>
          </Col>
          <Col span={24}>
            <Typography.Text>{edit?.description}</Typography.Text>
          </Col>
          <Col span={24}>
            <Form.Item
              getValueFromEvent={getSelectValue}
              style={{ marginBottom: "0" }}
              rules={[{ required: true, message: "Campo requerido" }]}
              id="appliedAt"
              name="appliedAt">
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
            <Form.Item
              label="Meta"
              id="goal"
              name="goal"
              style={{ marginBottom: "0" }}>
              {edit?.goal}
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              label="Reales"
              id="completed"
              name="completed"
              rules={[{ required: true, message: "Campo requerido" }]}
              style={{ marginBottom: "0" }}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Cumplimiento" style={{ marginBottom: "0" }}>
              {(form.getFieldValue("completed")) / edit?.goal }%
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
              rules={[{ required: true, message: "Campo requerido" }]}
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
                {edit?.title}
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
              rules={[{ required: true, message: "Campo requerido" }]}
              style={{ marginBottom: "0" }}>
              <UploadButton
                onDoneFile={onUploadFile}
                onRemoveFile={onRemoveFile}
                files={files}>
                Subir medio de verificación
              </UploadButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
