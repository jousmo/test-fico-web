import {
  Col, Divider, Form, Modal,
  Popover, Row, Tag, Typography
} from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useEffect } from "react"
import { DateField } from "../../../../../../../../shared"
import { ParticipantsText } from "./participants-text"
import { getSelectValue } from "../../../../../../../../../helpers"

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

  return (
    <Modal
      cancelText="Cancelar"
      onOk={onOk}
      width={550}
      onCancel={onClose}
      okText="Guardar"
      {...props}>
      <Form
        form={form}
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
          <Divider
            plain
            orientation="left"
            style={{ margin: "10px 0" }}>
            Participantes
            &nbsp;
            <Popover content={<ParticipantsText />}>
              <ExclamationCircleOutlined />
            </Popover>
          </Divider>
          <Divider
            plain
            orientation="left"
            style={{ margin: "10px 0" }}>
            Indicador
          </Divider>
        </Row>
      </Form>
    </Modal>
  )
}
