import { Modal, Form, Row, Col, InputNumber } from "antd"
import { SelectField } from "../../../../../../../../../shared"
import {
  ageRanges,
  genderTypes,
  preventionLevelTypes
} from "../../../../../../../../../../helpers/selectOptions/implementer/submission"
import { getSelectValue } from "../../../../../../../../../../helpers"

export function ParticipantsModal({ onSave, onCancel, type, ...props }) {
  const [form] = Form.useForm()

  const onOk = async () => {
    try {
      await form.validateFields()
      const values = await form.getFieldsValue()

      onSave(values)
      form.resetFields()
    }
    catch(e) {
      console.error(e)
    }
  }

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
  }

  const atendeeType = type === "ACTIVITY" ? (
    [{ label: "Asistente", value: "ATTENDEE" }]
  ) : (
    [{ label: "Beneficiario", value: "BENEFICIARY" }]
  )

  return (
    <Modal
      title="Participantes"
      onOk={onOk}
      onCancel={onCancelModal}
      width={350}
      okText="Guardar"
      cancelText="Cancelar"
      maskClosable={false}
      {...props}>
      <Form
        form={form}
        name="participants-form"
        layout="vertical">
        <Row gutter={[10, 8]} justify="start">
          <Col span={24}>
            <Form.Item
              name="amount"
              id="amount"
              style={{display: "inline"}}
              rules={[{ required: true, message: "Campo requerido" }]}>
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                placeholder="Ingrese cantidad" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="type"
              id="type"
              getValueFromEvent={getSelectValue}
              style={{display: "inline"}}
              rules={[{ required: true, message: "Campo requerido" }]}>
              <SelectField
                options={atendeeType}
                placeholder="Tipo" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="preventionLevel"
              id="preventionLevel"
              getValueFromEvent={getSelectValue}
              style={{display: "inline"}}
              rules={[{ required: true, message: "Campo requerido" }]}>
              <SelectField
                options={preventionLevelTypes}
                placeholder="Nivel de prevención / intervención" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="gender"
              id="gender"
              getValueFromEvent={getSelectValue}
              style={{display: "inline"}}
              rules={[{ required: true, message: "Campo requerido" }]}>
              <SelectField
                options={genderTypes}
                placeholder="Sexo" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="age"
              id="age"
              getValueFromEvent={getSelectValue}
              style={{display: "inline"}}
              rules={[{ required: true, message: "Campo requerido" }]}>
              <SelectField
                options={ageRanges}
                placeholder="Rango de edad" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
