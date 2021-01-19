import { Col, Divider, Form, Modal, Row, Tag, Typography } from "antd"
import { useEffect } from "react"
import { capitalize } from "lodash"
import { ScheduleField } from "./schedule-field"
import moment from "moment"
moment.locale("es")

export function ScheduleModal({ edit, onCancel, onSave, ...props }) {
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

      onSave(values.schedules, edit.id, edit.objective)
    }
    catch(e) {
      console.error(e)
    }
  }

  const onClose = () => {
    form.resetFields()
    onCancel()
  }

  const getDate = date => {
    return capitalize(moment(date).format("MMMM YYYY"))
  }

  return (
    <Modal
      className="project schedule modal"
      destroyOnClose
      cancelText="Cancelar"
      onOk={onOk}
      width={650}
      onCancel={onClose}
      okText="Guardar"
      maskClosable={false}
      {...props}>
      <Row gutter={[10, 8]} justify="start">
        <Col span={24}>
          <Tag color="processing">{edit?.key}</Tag>
        </Col>
        <Col span={24}>
          <Typography.Text strong>{edit?.title}</Typography.Text>
        </Col>
        <Col span={24}>
          <Typography.Text>{edit?.description}</Typography.Text>
        </Col>
        <Col span={24}>
          <Typography.Text strong>Medio de verificación: </Typography.Text>
          <Typography.Text>{edit?.meansOfVerification}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Linea base: </Typography.Text>
          <Typography.Text>{edit?.baseline}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Meta: </Typography.Text>
          <Typography.Text>{edit?.goal}</Typography.Text>
        </Col>
        <Col span={24}>
          <Typography.Text strong>Meses de implementación: </Typography.Text>
          <Typography.Text>
            {edit?.months?.map(range => (
              `${getDate(range[0])} - ${getDate(range[1])}`
            ))?.join(" | ")}
          </Typography.Text>
        </Col>
        <Divider
          orientation="left"
          style={{ margin: "10px 0" }}>
          Implementación
        </Divider>
        <Col span={24}>
          <Typography.Text>
            Si la actividad tiene más de un evento, agrega las fechas y el lugar donde se
            realizará.
          </Typography.Text>
        </Col>
        <Col span={24}>
          <Form
            form={form}
            name="activities-schedule-form">
            <Form.Item name="schedules">
              <ScheduleField />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  )
}
