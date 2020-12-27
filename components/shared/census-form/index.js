import React from "react"
import { Divider, Form, Input, Radio } from "antd"
import { getSelectValue } from "../../../helpers"
import { DateField } from "../../shared"

export function CensusForm({ form, disabled = false, divider = true }) {
  return (
    <Form
      className="form"
      layout="vertical"
      form={form}>
      {divider && <Divider orientation="left">Información personal</Divider>}
      <Form.Item
        label="Nombre:"
        name="name"
        rules={[{ required: true, message: "El campo es requerido" }]}>
        <Input name="name" disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="Apellido paterno:"
        name="lastName"
        rules={[{ required: true, message: "El campo es requerido" }]}>
        <Input name="lastName" disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="Apellido materno:"
        name="maidenName"
        rules={[{ required: true, message: "El campo es requerido" }]}>
        <Input name="maidenName" disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="Género:"
        name="gender">
        <Radio.Group disabled={disabled}>
          <Radio value="M">Masculino</Radio>
          <Radio value="F">Femenino</Radio>
          <Radio value="O">Prefiero no decirlo</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Fecha de nacimiento:"
        name="birthdate"
        getValueFromEvent={getSelectValue}
        rules={[{ required: true, message: "El campo es requerido" }]}>
        <DateField
          id="birthdate"
          style={{width: "100%"}}
          format="DD/MM/YYYY" disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="CURP:"
        name="curp"
        rules={[{ required: true, message: "El campo es requerido" }]}>
        <Input name="curp" disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="Teléfono:"
        name="phone"
        rules={[{ required: true, message: "El campo es requerido" }]}>
        <Input name="phone" disabled={disabled} />
      </Form.Item>
      {divider && <Divider orientation="left">Dirección</Divider>}
      <Form.Item
        label="Estado:"
        name="state"
        rules={[{ required: true, message: "El campo es requerido" }]}>
        <Input name="state" disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="Municipio:"
        name="municipality"
        rules={[{ required: true, message: "El campo es requerido" }]}>
        <Input name="municipality" disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="Colonia:"
        name="colony"
        rules={[{ required: true, message: "El campo es requerido" }]}>
        <Input name="colony" disabled={disabled} />
      </Form.Item>
    </Form>
  )
}
