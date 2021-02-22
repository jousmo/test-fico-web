import { Modal, Form, Row, Col, Input, Typography } from "antd"
import { useEffect, useState } from "react"
import { YearSelect } from "../../../../../shared"
import { getSelectValue } from "../../../../../../helpers/getSelectValue"
import { FinancingField } from "./financing-field"
import { money } from "../../../../../../helpers/valueFormat"
import { merge } from "lodash"

export function ProjectModal({ onCancel, onSave, edit, ...props }) {
  const [form] = Form.useForm()
  const [state, setState] = useState({ total: 0 })

  useEffect(() => {
    if(edit) {
      form.setFieldsValue(edit)
    }
  }, [edit])

  const onOk = async () => {
    try {
      await form.validateFields()
      let values = await form.getFieldsValue()
      values.financing = values?.financing?.map(el => ({ ...el, amount: +el.amount }))

      if(typeof edit?.index !== "undefined") {
        values.index = edit.index
        values = merge(edit, values)
      }

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

  const onCancelModal = () => {
    form.resetFields()
    onCancel()
  }

  return (
    <Modal
      title={`${edit ? "Editar" : "Agregar"} proyecto`}
      onOk={onOk}
      onCancel={onCancelModal}
      okText={edit ? "Guardar" : "Agregar"}
      cancelText="Cancelar"
      width={650}
      destroyOnClose
      maskClosable={false}
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
              <FinancingField
                onChange={onFinancingChange}
                total={state.total}
                value={edit?.financing} />
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
