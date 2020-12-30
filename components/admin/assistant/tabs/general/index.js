import React from "react"
import { CensusForm } from "../../../../shared"
import { Card, Form, Typography } from "antd"

export function CensusAssistantInfo({ data }) {
  const [form] = Form.useForm()
  form.setFieldsValue(data)

  return (
    <Card>
      <Typography.Title level={4}>Datos de contacto</Typography.Title>
      <CensusForm
        form={form}
        disabled={true}
        divider={false} />
    </Card>
  )
}
