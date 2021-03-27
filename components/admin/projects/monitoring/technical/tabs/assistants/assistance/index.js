import { Col, Modal, Form, Row, Select } from "antd"
import { DateField } from "../../../../../../../shared"
import { getSelectValue, warning } from "../../../../../../../../helpers"
import { getActivities } from "./helpers"

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
      width={500}
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
                  <Select.Option key={activity.id} value={activity.id}>
                    {activity.description}
                  </Select.Option>
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Fecha y hora"
              name="assistanceAt"
              rules={[{ required: true, message: "El campo es requerido" }]}
              getValueFromEvent={getSelectValue}>
              <DateField
                fullWidth
                format="DD/MM/YYYY HH:mm"
                showTime={{ format: 'HH:mm' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
