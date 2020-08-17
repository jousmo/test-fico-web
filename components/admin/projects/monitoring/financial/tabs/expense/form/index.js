import { useEffect, useState } from "react"
import { Modal, Form, Input, InputNumber, Divider, Alert, Button, Statistic, Space } from "antd"
import { DateField, SelectField, UploadButtonTwo } from "../../../../../../../shared"
import { getSelectValue } from "../../../../../../../../helpers/getSelectValue"
import { warning } from "../../../../../../../../helpers/alert"
import { merge } from "lodash"
import convert from "xml-js"

export function ModalExpense({ onSave, onCancel, edit, submission, ...props }) {
  const { budgeted, concepts } = submission || {}
  const listConcepts = concepts?.map(concept => ({ label: concept.name, value: concept.name }))

  const [state, setState] = useState({})
  const [form] = Form.useForm()

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 }
  }

  useEffect(() => {
    if(edit) {
      form.setFieldsValue(edit)
      setState(edit)
    } else {
      setState({})
    }
  }, [edit])

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
  }

  const onSubmit = async () => {
    try {
      await form.validateFields()
      let values = await form.getFieldsValue()

      if(typeof edit?.index !== "undefined") {
        delete edit.documents
        values.index = edit.index
        values = merge(edit, values)
      }

      onSave(values)
      form.resetFields()
    } catch (e) {
      warning("Llena los campos requeridos")
      console.error(e)
    }
  }

  const onDone = async (info) => {
    const documents = info?.map(el => {
      const type = el.type === "text/xml" ? "XML" : "PDF"
      return { type, name: el.name, url: el.url }
    })

    const filter = documents?.find(el => el.type === "XML")

    if (filter) {
      try {
        const response = await fetch(filter.url)
        const xml = await response.text()
        const xmlJson = convert.xml2js(xml, { compact: true, ignoreComment: true, alwaysChildren: true })
        const { UUID: uuid, FechaTimbrado: issuedAt } = xmlJson["cfdi:Comprobante"]["cfdi:Complemento"]["tfd:TimbreFiscalDigital"]["_attributes"]
        const { Nombre: issuer, Rfc: rfc } = xmlJson["cfdi:Comprobante"]["cfdi:Emisor"]["_attributes"]
        const { Nombre: receptor } = xmlJson["cfdi:Comprobante"]["cfdi:Receptor"]["_attributes"]
        const { Total: amount } = xmlJson["cfdi:Comprobante"]["_attributes"]
        const percentage = (amount * 100) / budgeted

        form.setFieldsValue({ uuid, issuedAt, issuer, rfc, receptor, amount: +amount, percentage: +percentage })
        setState({ ...state, amount: +amount, percentage: +percentage, documents })
      } catch (e) {
        console.error(e)
      }
    } else {
      setState({ ...state, documents })
    }

    form.setFieldsValue({ documents })
  }


  const onRemove = ({ type, url }) => {
    const oldDocuments = form.getFieldValue("documents")
    const documents = oldDocuments?.filter(document => document.url !== url)

    if (type === "XML") {
      form.setFieldsValue({ uuid: "", issuedAt: "", issuer: "", rfc: "", receptor: "", amount: 0, percentage: 0 })
      setState({ ...state, amount: 0, percentage: 0 })
    }

    setState({ ...state, documents })
    form.setFieldsValue({ documents })
  }

  return (
    <Modal
      title="&nbsp;"
      width={600}
      onCancel={onCancelModal}
      footer={[
        <UploadButtonTwo
          key={1}
          onDone={onDone}
          onRemove={onRemove}
          files={state?.documents}
          maxFile={2}
          accept={"application/pdf,application/xml"}
        >
          Subir factura
        </UploadButtonTwo>,
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
          <Input name="uuid" readOnly/>
        </Form.Item>
        <Divider orientation="left">Emisor</Divider>
        <Form.Item
          label="Razon social:"
          name="issuer"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="issuer" readOnly/>
        </Form.Item>
        <Form.Item
          label="RFC:"
          name="rfc"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="rfc" readOnly/>
        </Form.Item>
        <Form.Item
          label="Emisión:"
          name="issuedAt"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <DateField
            id="issuedAt"
            format="DD/MM/YYYY"
            disabled />
        </Form.Item>
        <Divider orientation="left">Receptor</Divider>
        <Form.Item
          label="Razon social:"
          name="receptor"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="receiver" readOnly/>
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
            type="number"/>
        </Form.Item>
        <Form.Item
          label="Coinversión 1:"
          name="investmentOnePayment"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <InputNumber
            name="investmentOnePayment"
            type="number"/>
        </Form.Item>
        <Form.Item
          label="Coinversión 2:"
          name="investmentTwoPayment"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <InputNumber
            name="investmentTwoPayment"
            type="number"/>
        </Form.Item>
        <Form.Item
          label="Implementadora:"
          name="implementerPayment"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <InputNumber
            name="implementerPayment"
            type="number"/>
        </Form.Item>
        <Form.Item
          hidden
          label="Total:"
          name="amount">
          <InputNumber
            name="amount"
            type="number"/>
        </Form.Item>
        <Form.Item
          hidden
          label="Uso del presupuesto:"
          name="percentage">
          <InputNumber
            name="percentage"
            type="number"/>
        </Form.Item>
        <Form.Item
          hidden
          label="Documentos"
          id="documents"
          name="documents">
          <Input name="documents" />
        </Form.Item>
        <Divider orientation="left">Importe</Divider>
        <Space>
          <Statistic title="Importe de factura" value={`$${state?.amount || 0}`} />
          <Statistic title="Uso del presupuesto" value={`${state?.percentage || 0}%`} />
        </Space>
      </Form>
    </Modal>
  )
}
