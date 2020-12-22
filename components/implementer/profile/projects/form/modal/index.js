import { Modal, Form, Row, Col, Input, Typography } from "antd"
import { useState } from "react"
import { YearSelect } from "../../../../../shared"
import { getSelectValue } from "../../../../../../helpers/getSelectValue"
import { FinancingField } from "./financing-field"
import { money } from "../../../../../../helpers/valueFormat"

export function ProjectModal({ onSave, ...props }) {
  const [form] = Form.useForm()
  const [state, setState] = useState({ total: 0 })

  const onOk = async () => {
    try {
      await form.validateFields()
      const values = await form.getFieldsValue()
      values.financing = values?.financing?.map(el => ({ ...el, amount: +el.amount }))

      onSave(values)
      form.resetFields()
    }
    catch(e) {
      console.error(e)
    }
  }

  const onFinancingChange = values => {
    const total = values?.reduce((prev, current) => {
      return prev + Number(current.amount || 0)
    }, 0)
    setState({ total })
  }

  return (
    <Modal
      title="Agregar proyecto"
      onOk={onOk}
      okText="Agregar"
      cancelText="Cancelar"
      width={650}
      destroyOnClose
      {...props}>
      <Form
        form={form}
        name="general-information"
        layout="vertical">
        <Row gutter={[10, 8]} justify="start">
          <Col span={24}>
            <Typography.Text>General</Typography.Text>
          </Col>
          <Col span={16}>
            <Form.Item
              name="name"
              style={{ display: "inline" }}
              label="Nombre del proyecto"
              rules={[{ required: true, message: "Campo requerido" }]}>
              <Input
                id="name"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="year"
              style={{ display: "inline" }}
              label="Año del proyecto"
              getValueFromEvent={getSelectValue}
              rules={[{ required: true, message: "Campo requerido" }]}>
              <YearSelect
                id="year"
                displayNumber={50} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="objective"
              style={{ display: "inline" }}
              label="Objetivo general del proyecto"
              rules={[{ required: true, message: "Campo requerido" }]}>
              <Input.TextArea
                rows={2}
                id="objective"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Typography.Text>Financiamiento</Typography.Text>
          </Col>
          <Col span={24}>
            <Form.Item name="financing">
              <FinancingField onChange={onFinancingChange} total={state.total} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Typography.Text>Monto total del proyecto: {money(state.total)}</Typography.Text>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
