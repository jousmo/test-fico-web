import { Col, Form, Modal, Row, Tag, Typography } from "antd"
import { useEffect } from "react"
import { capitalize } from "lodash"
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

  const getDate = date => {
    return capitalize(moment(date).format("MMMM YYYY"))
  }

  return (
    <Modal
      destroyOnClose
      cancelText="Cancelar"
      onOk={onOk}
      width={600}
      onCancel={onClose}
      okText="Guardar"
      {...props}>
      <Form
        form={form}
        name="indicator-form">
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
            <Typography.Text>Medio de verificación: </Typography.Text>
            <Typography.Text strong>{edit?.meansOfVerification}</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text>Linea base: </Typography.Text>
            <Typography.Text strong>{edit?.baseline}</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text>Meta: </Typography.Text>
            <Typography.Text strong>{edit?.goal}</Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text>Meses de implementación: </Typography.Text>
            <Typography.Text strong>
              {edit?.months.map(range => (
                `${getDate(range[0])} - ${getDate(range[1])}`
              )).join(" | ")}
            </Typography.Text>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
