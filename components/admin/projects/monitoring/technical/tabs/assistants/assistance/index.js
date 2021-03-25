import { Col, Modal, Form, Row, Select, TimePicker } from "antd"
import { DateField } from "../../../../../../../shared"
import { getSelectValue, warning } from "../../../../../../../../helpers"
import { getActivities } from "./helpers"
import Moment from "moment"

export function AssistanceModal({ onSave, onCancel, submission, ...props }) {
  const [form] = Form.useForm()
  const activities = getActivities(submission)

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
  }

  const onSubmit = async () => {
    try {
      await form.validateFields()
      const values = await form.getFieldsValue()
      values.time = Moment(values.time).format()

      form.resetFields()
      onSave && onSave(values)
    } catch (e) {
      warning("Llena los campos requeridos")
      console.error(e)
    }
  }

  return (
    <Modal
      destroyOnClose
      title="Agregar asistencia"
      width={600}
      okText="Guardar"
      cancelText="Cancelar"
      onOk={onSubmit}
      onCancel={onCancelModal}
      maskClosable={false}
      {...props}>
      <Form form={form} layout="vertical">
        <Row gutter={[10, 8]}>
          <Col span={24}>
            <Form.Item
              label="Selecciona actividad(es)"
              name="activities"
              rules={[{ required: true, message: "El campo es requerido" }]}>
              <Select mode="multiple">
                {activities?.map(activity =>
                  <Select.Option id={activity.id} value={activity.id}>
                    {activity.description}
                  </Select.Option>
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Fecha"
              name="date"
              rules={[{ required: true, message: "El campo es requerido" }]}
              getValueFromEvent={getSelectValue}>
              <DateField fullWidth format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Hora"
              name="time"
              rules={[{ required: true, message: "El campo es requerido" }]}>
              <TimePicker format="HH:mm" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
