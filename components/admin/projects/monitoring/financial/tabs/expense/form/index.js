import { useState } from "react"
import { Modal, Form, Input, Divider, Select, Alert, Button, Upload, Statistic, Space } from "antd"
import { DateField } from "../../../../../../../shared"
import { UploadOutlined } from "@ant-design/icons"
import { getSelectValue } from "../../../../../../../../helpers/getSelectValue"
import { warning } from "../../../../../../../../helpers/alert"

export function ModalExpense({ onSave, onCancel, budgeted, ...props }) {
  const [state, setState] = useState({})
  const [form] = Form.useForm()

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 }
  }

  const onCancelModal = () => {
    form.resetFields()
    setState({})
    onCancel && onCancel()
  }

  const onChange = ({ target: { name, value }}) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const calculate = () => {
    const ficosecPayment = +state?.ficosecPayment || 0
    const investmentOnePayment = +state?.investmentOnePayment || 0
    const investmentTwoPayment = +state?.investmentTwoPayment || 0
    const implementerPayment = +state?.implementerPayment || 0

    const amount = ficosecPayment + investmentOnePayment + investmentTwoPayment + implementerPayment
    const percentage = (amount * 100) / budgeted

    return { amount, percentage }
  }

  const onSubmit = async () => {
    try {
      const values = await form.validateFields()
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
          <Input  name="rfc" />
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
          <Select name="receiver" options={[{ label: "José Uscanga", value:"José Uscanga"}]} />
        </Form.Item>
        <Divider orientation="left">Asignación</Divider>
        <Form.Item
          label="Mes de asignación:"
          name="monthAt"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Select name="monthAt" options={[{ label: "Enero 2020", value:"Enero 2020"}]} />
        </Form.Item>
        <Form.Item
          label="ID Concepto:"
          name="concept"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Select name="concept" options={[{ label: "Concepto 1", value:"Concepto 1"}]} />
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
          <Input
            name="ficosecPayment"
            type="number"
            onChange={onChange}/>
        </Form.Item>
        <Form.Item
          label="Coinversión 1:"
          name="investmentOnePayment"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input
            name="investmentOnePayment"
            type="number"
            onChange={onChange}/>
        </Form.Item>
        <Form.Item
          label="Coinversión 2:"
          name="investmentTwoPayment"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input
            name="investmentTwoPayment"
            type="number"
            onChange={onChange}/>
        </Form.Item>
        <Form.Item
          label="Implementadora:"
          name="implementerPayment"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input
            name="implementerPayment"
            type="number"
            onChange={onChange}/>
        </Form.Item>
        <Divider orientation="left">Importe</Divider>
        <Space>
          <Statistic title="Importe de factura" value={`$${calculate().amount.toFixed(2)}`} />
          <Statistic title="Uso del presupuesto" value={`${calculate().percentage.toFixed(2)}%`} />
        </Space>
      </Form>
    </Modal>
  )
}
