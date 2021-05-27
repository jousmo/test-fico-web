import { useContext, useEffect } from "react"
import { DeleteOutlined } from "@ant-design/icons"
import { Col, Input, Modal, Form, Popconfirm, Row, Space, Typography } from "antd"
import { DateField } from "../../../../../../../shared"
import { getSelectValue, warning } from "../../../../../../../../helpers"
import { AdminSubmissionContext } from "../../../../../../../../contexts/admin/submissions/show"

export function AssistanceModal({ assistance, onCancel, ...props }) {
  const { createAssistance, deleteAssistance } = useContext(AdminSubmissionContext)
  const [form] = Form.useForm()

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
  }

  useEffect(() => {
    if (assistance?.assistanceAt) {
      form.setFieldsValue(assistance)
    }
  }, [assistance])

  const onDelete = () => {
    try {
      deleteAssistance(assistance.id)
      form.resetFields()
      onCancel()
    } catch (e) {
      console.error(e)
    }
  }

  const onSubmit = async () => {
    try {
      await form.validateFields()
      const values = await form.getFieldsValue()

      createAssistance([values])
      form.resetFields()
      onCancel()
    } catch (e) {
      console.error(e)
      warning("Llena los campos requeridos")
    }
  }

  return (
    <Modal
      destroyOnClose
      title={
        <Space>
          <Typography.Text>
            Editar asistencia
          </Typography.Text>
          <Popconfirm
            title="Seguro que deseas eliminar la asistencia?"
            onConfirm={onDelete}
            okText="Sí">
            <a><DeleteOutlined /></a>
          </Popconfirm>
        </Space>
      }
      width={400}
      okText="Guardar"
      cancelText="Cancelar"
      onOk={onSubmit}
      onCancel={onCancelModal}
      maskClosable={false}
      {...props}>
      <Form form={form} layout="vertical">
        <Row gutter={[10, 8]}>
          <Col span={24}>
            <Form.Item name="id" style={{ display: "none" }}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Fecha y hora"
              name="assistanceAt"
              rules={[{ required: true, message: "El campo es requerido" }]}
              getValueFromEvent={getSelectValue}>
              <DateField
                fullWidth
                format="DD/MM/YYYY HH:mm"
                showTime={{ format: "HH:mm" }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
