import React from "react"
import { Card, Form, Input, Radio, Typography } from "antd"
import { getSelectValue } from "../../../../../../helpers"
import { DateField } from "../../../../../shared"

export function CensusBeneficiaryInfo({ data }) {
  const [form] = Form.useForm()
  form.setFieldsValue(data)

  return (
    <Card>
      <Typography.Title level={4}>Datos de contacto</Typography.Title>
      <Form
        className="form"
        layout="vertical"
        form={form}>
        <Form.Item
          label="Nombre:"
          name="name">
          <Input name="name" disabled />
        </Form.Item>
        <Form.Item
          label="Apellido paterno:"
          name="lastName">
          <Input name="lastName" disabled />
        </Form.Item>
        <Form.Item
          label="Apellido materno:"
          name="maidenName">
          <Input name="maidenName" disabled />
        </Form.Item>
        <Form.Item
          label="Género:"
          name="gender">
          <Radio.Group disabled>
            <Radio value="M">Masculino</Radio>
            <Radio value="F">Femenino</Radio>
            <Radio value="O">Prefiero no decirlo</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Fecha de nacimiento:"
          name="birthdate"
          getValueFromEvent={getSelectValue}>
          <DateField
            id="birthdate"
            style={{width: "100%"}}
            format="DD/MM/YYYY"
            disabled />
        </Form.Item>
        <Form.Item
          label="CURP:"
          name="curp">
          <Input name="curp" disabled />
        </Form.Item>
        <Form.Item
          label="Teléfono:"
          name="phone">
          <Input name="phone" disabled />
        </Form.Item>
        <Form.Item
          label="Estado:"
          name="state">
          <Input name="state" disabled />
        </Form.Item>
        <Form.Item
          label="Municipio:"
          name="municipality">
          <Input name="municipality" disabled />
        </Form.Item>
        <Form.Item
          label="Colonia:"
          name="colony">
          <Input name="colony" disabled />
        </Form.Item>
      </Form>
    </Card>
  )
}
