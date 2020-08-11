import { Modal, Form, Input, Divider, Select, DatePicker, Alert, Button, Upload, Statistic, Space } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import moment from "moment"

export function ExpenseModal({ onCancel, ...props }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 }
  }

  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"]

  return (
    <Modal
      title="&nbsp;"
      width={600}
      onCancel={onCancel}
      footer={[
        <Upload>
          <Button>
            <UploadOutlined /> Adjuntar PDF
          </Button>
        </Upload>,
        <Button
          key="submit"
          type="primary"
          onClick={null}>
          Submit
        </Button>
      ]}
      {...props}>
      <Alert
        type="info"
        showIcon
        message="Llena la información de la factura y adjunta el archivo PDF para corroborar la información" />
      <Form
        {...layout}
        name="expense-form">
        <Divider orientation="left">Información general</Divider>
        <Form.Item
          label="Folio SAT:"
          name="username">
          <Input />
        </Form.Item>
        <Divider orientation="left">Emisor</Divider>
        <Form.Item
          label="Razon social:"
          name="username">
          <Input />
        </Form.Item>
        <Form.Item
          label="RFC:"
          name="username">
          <Input />
        </Form.Item>
        <Form.Item
          label="Emisión:"
          name="username">
          <Input />
        </Form.Item>
        <Divider orientation="left">Receptor</Divider>
        <Form.Item
          label="Razon social:"
          name="username">
          <Select />
        </Form.Item>
        <Divider orientation="left">Asignación</Divider>
        <Form.Item
          label="Mes de asignación:"
          name="username">
          <Select />
        </Form.Item>
        <Form.Item
          label="ID Concepto:"
          name="username">
          <Select />
        </Form.Item>
        <Form.Item
          label="ID Rubro:"
          name="username">
          <Input />
        </Form.Item>
        <Divider orientation="left">Importe</Divider>
        <Space>
          <Statistic title="Importe de factura" value="$456.00" />
          <Statistic title="Uso del presupuesto" value="16%" />
        </Space>
        <Form.Item
          label="Fecha de pago:"
          name="username">
          <DatePicker defaultValue={moment("01/01/2020", dateFormatList[0])} format={dateFormatList} />
        </Form.Item>
        <Divider orientation="left">Coinversión</Divider>
        <Form.Item
          label="FICOSEC:"
          name="username">
          <Input />
        </Form.Item>
        <Form.Item
          label="Coinversión 1:"
          name="username">
          <Input />
        </Form.Item>
        <Form.Item
          label="Coinversión 2:"
          name="username">
          <Input />
        </Form.Item>
        <Form.Item
          label="Implementadora:"
          name="username">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
