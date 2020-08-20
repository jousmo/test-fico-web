import { Modal, Form, Input, InputNumber, Divider, Alert, Statistic, Space, Typography } from "antd"
import { DateField, SelectField, UploadButtonForm } from "../../../../../../../shared"
import { cellFormat, getSelectValue, warning} from "../../../../../../../../helpers"
import convert from "xml-js"
import { useEffect, useState } from "react"
import { merge } from "lodash"

export function ModalExpense({ onSave, onCancel, edit, submission, ...props }) {
  const [state, setState] = useState({
    amount: 0,
    percentage: 0,
    ficosecPaymentPercentage: 0,
    investmentOnePaymentPercentage: 0,
    investmentTwoPaymentPercentage: 0,
    implementerPaymentPercentage: 0
  })

  const [form] = Form.useForm()
  const listConcepts = submission?.concepts?.map(concept => ({ label: concept.name, value: concept.name }))

  useEffect(() => {
    if(edit) {
      form.setFieldsValue(edit)
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

      onSave && onSave(values)
    } catch (e) {
      warning("Llena los campos requeridos")
      console.error(e)
    }
  }

  const onDoneFile = async file => {
    const documents = file?.map(el => {
      const type = el.type === "text/xml" ? "XML" : "PDF"
      return { id: el.id, type, name: el.name, url: el.url }
    })

    const nodes = await readXmlFile(documents)

    await form.setFieldsValue({ documents, ...nodes })
    setState({ ...state, amount: nodes.amount, percentage: nodes.percentage || 0 })
  }

  const onRemoveFile = async ({ type, url }) => {
    const oldDocuments = form.getFieldValue("documents")
    const documents = oldDocuments.filter(document => document.url !== url)

    if (type === "XML" || type === "text/xml") {
      await form.setFieldsValue({
        documents,
        uuid: undefined,
        issuedAt: undefined,
        issuer: undefined,
        rfc: undefined,
        receptor: undefined,
        amount: 0,
        percentage: 0 })
    } else {
      await form.setFieldsValue({ documents })
    }
  }

  const readXmlFile = async documents => {
    const document = documents?.find(el => el.type === "XML")

    if (!document) return {}

    try {
      const response = await fetch(document.url)
      const xml = await response.text()
      const xmlJson = convert.xml2js(xml, { compact: true, ignoreComment: true, alwaysChildren: true })
      const { UUID: uuid, FechaTimbrado: issuedAt } = xmlJson["cfdi:Comprobante"]["cfdi:Complemento"]["tfd:TimbreFiscalDigital"]["_attributes"]
      const { Nombre: issuer, Rfc: rfc } = xmlJson["cfdi:Comprobante"]["cfdi:Emisor"]["_attributes"]
      const { Nombre: receptor } = xmlJson["cfdi:Comprobante"]["cfdi:Receptor"]["_attributes"]
      const amount = +xmlJson["cfdi:Comprobante"]["_attributes"]["Total"]
      const percentage = (amount * 100) / submission?.budgeted
      return { uuid, issuedAt, issuer, rfc, receptor, amount, percentage }
    } catch (err) {
      console.error(err)
    }
  }

  const toFileList = (files) => {
    return files?.map((document, index) => ({ uid: index, status: "done", ...document }))
  }

  const onChange = (who, value) => {
    const percentage = state?.amount ? ((value * 100) / state.amount) : 0
    setState({
      ...state,
      [who]: percentage
    })
  }
  
  return (
    <Modal
      destroyOnClose
      title="&nbsp;"
      width={600}
      okText="Guardar factura"
      cancelText="Cancelar"
      onOk={onSubmit}
      onCancel={onCancelModal}
      {...props}>
      <Alert
        type="info"
        showIcon
        message="Llena la información de la factura y adjunta el archivo PDF para corroborar la información" />
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
        form={form}>
        <Form.Item
          name="documents"
          getValueFromEvent={onDoneFile}>
          <UploadButtonForm
            defaultFileList={toFileList(edit?.documents)}
            onRemoveFile={onRemoveFile}
            accept={"application/pdf,application/xml"}>
            Subir factura
          </UploadButtonForm>
        </Form.Item>
        <Divider orientation="left">Información general</Divider>
        <Form.Item
          label="Folio SAT:"
          name="uuid"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="uuid" readOnly />
        </Form.Item>
        <Divider orientation="left">Emisor</Divider>
        <Form.Item
          label="Razon social:"
          name="issuer"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="issuer" readOnly />
        </Form.Item>
        <Form.Item
          label="RFC:"
          name="rfc"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="rfc" readOnly />
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
          <Input name="receiver" readOnly />
        </Form.Item>
        <Divider orientation="left">Asignación</Divider>
        <Form.Item
          label="Mes de asignación:"
          name="monthAt"
          getValueFromEvent={getSelectValue}
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <SelectField
            id="monthAt"
            options={[{ label: "Enero 2020", value:"Enero 2020"}]} />
        </Form.Item>
        <Form.Item
          label="ID Concepto:"
          name="concept"
          getValueFromEvent={getSelectValue}
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <SelectField
            id="concept"
            options={listConcepts} />
        </Form.Item>
        <Form.Item
          label="ID Rubro:"
          name="category"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <Input name="entry"/>
        </Form.Item>
        <Divider orientation="left">Importe</Divider>
        <Space>
          <Statistic title="Importe de factura" value={cellFormat.money(state?.amount).children} />
          <Statistic title="Uso del presupuesto" value={`${state.percentage}%`} />
        </Space>
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
          className="wrapper-number"
          label="FICOSEC:"
          name="ficosecPayment"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <InputNumber
            name="ficosecPayment"
            onChange={(value) => onChange("ficosecPaymentPercentage", value)}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')} />
          <Typography.Title level={4}>{`${state?.ficosecPaymentPercentage.toFixed(2)}%`}</Typography.Title>
        </Form.Item>
        <Form.Item
          className="wrapper-number"
          label="Coinversión 1:"
          name="investmentOnePayment"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <InputNumber
            name="investmentOnePayment"
            onChange={(value) => onChange("investmentOnePaymentPercentage", value)}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')} />
          <Typography.Title level={4}>{`${state?.investmentOnePaymentPercentage.toFixed(2)}%`}</Typography.Title>
        </Form.Item>
        <Form.Item
          className="wrapper-number"
          label="Coinversión 2:"
          name="investmentTwoPayment"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <InputNumber
            name="investmentTwoPayment"
            onChange={(value) => onChange("investmentTwoPaymentPercentage", value)}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')} />
          <Typography.Title level={4}>{`${state?.investmentTwoPaymentPercentage.toFixed(2)}%`}</Typography.Title>
        </Form.Item>
        <Form.Item
          className="wrapper-number"
          label="Implementadora:"
          name="implementerPayment"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <InputNumber
            name="implementerPayment"
            onChange={(value) => onChange("implementerPaymentPercentage", value)}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')} />
          <Typography.Title level={4}>{`${state?.implementerPaymentPercentage.toFixed(2)}%`}</Typography.Title>
        </Form.Item>
        <Divider orientation="left">Importe</Divider>
        <Form.Item
          label="Total:"
          name="amount">
          <InputNumber name="amount" readOnly />
        </Form.Item>
        <Form.Item
          label="Uso del presupuesto:"
          name="percentage">
          <InputNumber name="percentage" readOnly />
        </Form.Item>
      </Form>
    </Modal>
  )
}
