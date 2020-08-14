import { useEffect, useState } from "react"
import { Modal, Form, Input, InputNumber, Divider, Alert, Button, Upload, Statistic, Space } from "antd"
import { DateField, SelectField } from "../../../../../../../shared"
import { UploadOutlined } from "@ant-design/icons"
import { getSelectValue } from "../../../../../../../../helpers/getSelectValue"
import { warning } from "../../../../../../../../helpers/alert"
import { merge } from "lodash"

export function ModalExpense({ onSave, onCancel, edit, submission, ...props }) {
  const { budgeted, amount = 0, percentage = 0, concepts } = submission || {}
  const listConcepts = concepts?.map(concept => ({ label: concept.name, value: concept.name }))

  const [state, setState] = useState({ amount, percentage })
  const [form] = Form.useForm()

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 }
  }

  useEffect(() => {
    if(edit) {
      form.setFieldsValue(edit)
      setState(edit)
    }
  }, [edit])

  const onCancelModal = () => {
    form.resetFields()
    setState({})
    onCancel && onCancel()
  }

  const onChange = () => {
    const ficosecPayment = form.getFieldValue("ficosecPayment") || 0
    const investmentOnePayment = form.getFieldValue("investmentOnePayment") || 0
    const investmentTwoPayment = form.getFieldValue("investmentTwoPayment") || 0
    const implementerPayment = form.getFieldValue("implementerPayment") || 0

    const amount = ficosecPayment + investmentOnePayment + investmentTwoPayment + implementerPayment
    const percentage = (amount * 100) / budgeted

    form.setFieldsValue({ amount, percentage })
    setState({ ...state, amount, percentage })
  }

  const onSubmit = async () => {
    try {
      await form.validateFields()
      let values = await form.getFieldsValue()

      if(typeof edit?.index !== "undefined") {
        values.index = edit.index
        values = merge(edit, values)
      }

      onSave(values)
    } catch (e) {
      warning("Llena los campos requeridos")
      console.error(e)
    }
  }

  return (
    <Modal
      title="&nbsp;"
      width={600}
      onCancel={onCancelModal}
      footer={[
        <Upload key={1}>
          <Button>
            <UploadOutlined /> Adjuntar PDF
          </Button>
        </Upload>,
        <Button
          key="submit"
          type="primary"
          onClick={onSubmit}>
          Guardar factura
        </Button>
      ]}
      {...props}>
      <Alert
        type="info"
        showIcon
        message="Llena la información de la factura y adjunta el archivo PDF para corroborar la información" />
      <Form
        {...layout}
        name="expense-form"
        form={form}>
        <Divider orientation="left">Información general</Divider>
        <Form.Item
          label="Folio SAT:"
          name="uuid"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="uuid" />
        </Form.Item>
        <Divider orientation="left">Emisor</Divider>
        <Form.Item
          label="Razon social:"
          name="issuer"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="issuer" />
        </Form.Item>
        <Form.Item
          label="RFC:"
          name="rfc"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="rfc" />
        </Form.Item>
        <Form.Item
          label="Emisión:"
          name="issuedAt"
          getValueFromEvent={getSelectValue}
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <DateField
            id="issuedAt"
            format="DD/MM/YYYY" />
        </Form.Item>
        <Divider orientation="left">Receptor</Divider>
        <Form.Item
          label="Razon social:"
          name="receptor"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="receiver" />
        </Form.Item>
        <Divider orientation="left">Asignación</Divider>
        <Form.Item
          label="Mes de asignación:"
          name="monthAt"
          getValueFromEvent={getSelectValue}
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <SelectField
            id="monthAt"
            options={[{ label: "Enero 2020", value:"Enero 2020"}, { label: "Agosto 2020", value:"Agosto 2020"}]}/>
        </Form.Item>
        <Form.Item
          label="ID Concepto:"
          name="concept"
          getValueFromEvent={getSelectValue}
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <SelectField
            id="concept"
            options={listConcepts}/>
        </Form.Item>
        <Form.Item
          label="ID Rubro:"
          name="category"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="entry" />
        </Form.Item>
        <Form.Item
          label="Fecha de pago:"
          name="paymentAt"
          getValueFromEvent={getSelectValue}
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <DateField
            id="paymentAt"
            format="DD/MM/YYYY" />
        </Form.Item>
        <Divider orientation="left">Coinversión</Divider>
        <Form.Item
          label="FICOSEC:"
          name="ficosecPayment"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <InputNumber
            name="ficosecPayment"
            type="number"
            onChange={onChange}/>
        </Form.Item>
        <Form.Item
          label="Coinversión 1:"
          name="investmentOnePayment"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <InputNumber
            name="investmentOnePayment"
            type="number"
            onChange={onChange}/>
        </Form.Item>
        <Form.Item
          label="Coinversión 2:"
          name="investmentTwoPayment"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <InputNumber
            name="investmentTwoPayment"
            type="number"
            onChange={onChange}/>
        </Form.Item>
        <Form.Item
          label="Implementadora:"
          name="implementerPayment"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <InputNumber
            name="implementerPayment"
            type="number"
            onChange={onChange}/>
        </Form.Item>
        <Form.Item hidden name="amount"/>
        <Form.Item hidden name="percentage"/>
        <Divider orientation="left">Importe</Divider>
        <Space>
          <Statistic title="Importe de factura" value={`$${state?.amount?.toFixed(2)}`} />
          <Statistic title="Uso del presupuesto" value={`${state?.percentage?.toFixed(2)}%`} />
        </Space>
      </Form>
    </Modal>
  )
}
