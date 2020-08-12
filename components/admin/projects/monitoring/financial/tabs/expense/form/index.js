import { Modal, Form, Input, Divider, Select, Alert, Button, Upload, Statistic, Space } from "antd"
import { DateField } from "../../../../../../../shared"
import { UploadOutlined } from "@ant-design/icons"
import moment from "moment"
import { useState } from "react"
moment.locale("es")

export function ModalExpense({ onSave, onCancel, ...props }) {
  const [form] = Form.useForm()
  const [state, setState] = useState({})
  const [stateDates, setStateDates] = useState({})

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 }
  }

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
  }

  const onFormChange = () => {
    const values = form.getFieldsValue()
    setState(values)
  }

  const onChangeDate = ({ currentTarget: { id: name, value }}) => {
    const format = moment(value).format("L")
    setStateDates({
      ...stateDates,
      [name]: format
    })
  }

  const onOk = async () => {
    const values = { ...state, ...stateDates }
    form.resetFields()
    onSave(values)
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
          onClick={onOk}>
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
        form={form}
        onChange={onFormChange}>
        <Divider orientation="left">Información general</Divider>
        <Form.Item
          label="Folio SAT:"
          name="uuid">
          <Input name="uuid" />
        </Form.Item>
        <Divider orientation="left">Emisor</Divider>
        <Form.Item
          label="Razon social:"
          name="issuer">
          <Input name="issuer" />
        </Form.Item>
        <Form.Item
          label="RFC:"
          name="rfc">
          <Input  name="rfc" />
        </Form.Item>
        <Form.Item
          label="Emisión:"
          name="issuedAt">
          <DateField
            id="issuedAt"
            onChange={onChangeDate}
            format="DD/MM/YYYY" />
        </Form.Item>
        <Divider orientation="left">Receptor</Divider>
        <Form.Item
          label="Razon social:"
          name="receptor">
          <Select name="receiver" options={[{ label: "José Uscanga", value:"José Uscanga"}]} />
        </Form.Item>
        <Divider orientation="left">Asignación</Divider>
        <Form.Item
          label="Mes de asignación:"
          name="monthAt">
          <Select name="monthAt" options={[{ label: "Enero 2020", value:"Enero 2020"}]} />
        </Form.Item>
        <Form.Item
          label="ID Concepto:"
          name="concept">
          <Select name="concept" options={[{ label: "Concepto 1", value:"Concepto 1"}]} />
        </Form.Item>
        <Form.Item
          label="ID Rubro:"
          name="category">
          <Input name="entry" />
        </Form.Item>
        <Form.Item
          label="Fecha de pago:"
          name="paymentAt">
          <DateField
            id="paymentAt"
            onChange={onChangeDate}
            format="DD/MM/YYYY" />
        </Form.Item>
        <Divider orientation="left">Coinversión</Divider>
        <Form.Item
          label="FICOSEC:"
          name="ficosecPayment">
          <Input name="ficosecPayment" />
        </Form.Item>
        <Form.Item
          label="Coinversión 1:"
          name="investmentOnePayment">
          <Input name="investmentOnePayment" />
        </Form.Item>
        <Form.Item
          label="Coinversión 2:"
          name="investmentTwoPayment">
          <Input  name="investmentTwoPayment" />
        </Form.Item>
        <Form.Item
          label="Implementadora:"
          name="implementerPayment">
          <Input name="implementerPayment" />
        </Form.Item>
        <Divider orientation="left">Importe</Divider>
        <Space>
          <Statistic title="Importe de factura" value="$456.00" />
          <Statistic title="Uso del presupuesto" value="16%" />
        </Space>
      </Form>
    </Modal>
  )
}
