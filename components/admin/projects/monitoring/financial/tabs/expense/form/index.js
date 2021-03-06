import {
  Modal,
  Form,
  Input,
  InputNumber,
  Divider,
  Alert,
  Statistic,
  Space,
  Typography,
  Switch,
  Col,
  Checkbox
} from "antd"
import { DateField, SelectField, UploadButtonForm } from "../../../../../../../shared"
import { cellFormat, getSelectValue, warning } from "../../../../../../../../helpers"
import { conceptTypes }from "../../../../../../../../helpers/selectOptions/implementer/submission"
import { useEffect, useState } from "react"
import { merge, omit } from "lodash"
import {
  INIT_STATE,
  RESET_XML_DATA,
  readXmlFile,
  toFileList,
  getPercentagePayment,
  validateDocuments,
  projectMonths,
  listConcepts
} from "../../../helpers"
import { useAuth } from "../../../../../../../../contexts/auth"

export function ModalExpense({ onSave, onCancel, edit, submission, update, disabled, ...props }) {
  const [state, setState] = useState(INIT_STATE)
  const [stateTypeRH, setStateTypeRH] = useState(false)
  const [stateOldAmount, setStateOldAmount] = useState(false)
  const [form] = Form.useForm()

  const { user } = useAuth()
  const isAdmin = user?.claims?.role === "ADMIN"

  useEffect(() => {
    if(edit) {
      form.setFieldsValue(edit)
      loadPercentagePayment(edit)
      setStateOldAmount(edit.amount)
      setStateTypeRH(edit?.typeRH)
    }
  }, [edit])

  const loadPercentagePayment = async (data) => {
    const setData = getPercentagePayment(data)
    setState({ ...setData })
  }

  const onCancelModal = () => {
    form.resetFields()
    setState(INIT_STATE)
    setStateTypeRH(false)
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

      const { error, message } = await validateDocuments(values, submission, stateOldAmount)
      if (error) {
        return warning(message)
      }

      const newValues = omit(values, ["rfcRec", "total", "status"])

      form.resetFields()
      setState(INIT_STATE)
      onSave && onSave(newValues)
    } catch (e) {
      warning("Llena los campos requeridos")
      console.error(e)
    }
  }

  const onDoneFile = async file => {
    const documents = file?.map(el => {
      const type = (el.type === "text/xml" || el.type === "XML") ? "XML" : "PDF"
      return { id: el.id, type, name: el.name, url: el.url }
    })

    try {
      const nodes = await readXmlFile(documents, submission?.budgeted)
      await form.setFieldsValue({ documents, ...nodes })
      setState({ ...state, amount: nodes.amount, percentage: nodes.percentage || 0 })
    } catch (err) {
      console.error(err)
    }
  }

  const onRemoveFile = async ({ type, url }) => {
    const oldDocuments = form.getFieldValue("documents")
    const documents = oldDocuments?.filter(document => document.url !== url)

    if (type === "XML" || type === "text/xml") {
      setState(INIT_STATE)
      form.setFieldsValue(RESET_XML_DATA)
    } else {
      await form.setFieldsValue({ documents })
    }
  }

  const onChange = (who, value) => {
    const percentage = state?.amount ? ((value * 100) / state.amount) : 0
    setState({
      ...state,
      [who]: percentage.toFixed(2)
    })
  }

  const onChangeIsTypeRh = ({ target }) => {
    const typeRH = target.checked
    form.setFieldsValue({ typeRH })
    setStateTypeRH(typeRH)
  }

  const handleChangeListConcepts = ({currentTarget: { value }}) => {
    const { type } = submission?.concepts?.find(concept => concept.id === value)
    form.setFieldsValue({ category: type })
  }

  const onChangeTotal = (value) => {
    const percentage = +((value * 100) / submission?.budgeted).toFixed(2) || 0
    form.setFieldsValue({ percentage })
    setState({ ...state, percentage })
  }

  const onLock = reviewed => {
    const { id } = edit
    update({ id, reviewed })
    onCancel()
  }

  const readOnly = edit?.reviewed || disabled
  const typeRH = edit?.typeRH

  return (
    <Modal
      destroyOnClose
      title="&nbsp;"
      width={600}
      okText="Guardar factura"
      cancelText="Cancelar"
      onOk={onSubmit}
      onCancel={onCancelModal}
      maskClosable={false}
      okButtonProps={{ disabled }}
      {...props}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
        form={form}>

        {isAdmin &&
          <Col span={20}>
            Bloquear revisi??n:
            &nbsp;
            <Switch onChange={value => onLock(value)} size="small" defaultChecked={readOnly} />
          </Col>
        }

        <Alert
          type="info"
          showIcon
          message="Llena la informaci??n de la factura y adjunta el archivo PDF para corroborar la informaci??n" />

        <Form.Item name='typeRH'>
          <Checkbox
            name='typeRH'
            disabled={readOnly}
            defaultChecked={typeRH}
            onChange={onChangeIsTypeRh}
            style={{ fontSize: '13px', fontWeight: 500 }}>
            Si tu factura es para comprobar un gasto de tipo Recurso Humano marca la casilla.
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="documents"
          getValueFromEvent={onDoneFile}>
          <UploadButtonForm
            fileList={toFileList(edit?.documents)}
            onRemoveFile={onRemoveFile}
            maxFile={2}
            accept={"application/pdf,application/xml,.xml,.pdf"}
            readOnly>
            Subir factura
          </UploadButtonForm>
        </Form.Item>
        <Divider orientation="left">Informaci??n general</Divider>
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
          hidden
          name="rfcRec">
          <Input name="rfcRec" readOnly />
        </Form.Item>
        <Form.Item
          label="Emisi??n:"
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
        <Divider orientation="left">Asignaci??n</Divider>
        <Form.Item
          label="Mes de asignaci??n:"
          name="monthAt"
          getValueFromEvent={getSelectValue}
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <SelectField
            id="monthAt"
            options={projectMonths(submission)}
            disabled={readOnly}/>
        </Form.Item>
        <Form.Item
          label="ID Concepto:"
          name="concept"
          getValueFromEvent={getSelectValue}
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <SelectField
            id="concept"
            onChange={handleChangeListConcepts}
            options={listConcepts(submission)}
            disabled={readOnly}/>
        </Form.Item>
        <Form.Item
          label="ID Rubro:"
          name="category"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <SelectField
            id="category"
            options={conceptTypes}
            disabled/>
        </Form.Item>
        <Divider orientation="left">Importe</Divider>

        <Form.Item
          hidden={!stateTypeRH}
          label="Importe de la factura:"
          name="amount"
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <InputNumber
            name="amount"
            onChange={onChangeTotal}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            disabled={readOnly}/>
        </Form.Item>

        <Form.Item
          hidden
          name="total">
          <InputNumber
            name="total"
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            disabled={readOnly}/>
        </Form.Item>

        <Space>
          {!stateTypeRH && (
            <Statistic title="Importe de factura" value={cellFormat.money(state?.amount).children} />
          )}
          <Statistic title="Uso del presupuesto" value={`${state?.percentage}%`} />
        </Space>

        <Form.Item
          label="Fecha de pago:"
          name="paymentAt"
          getValueFromEvent={getSelectValue}
          rules={[{ required: true, message: "El campo es requerido" }]}>
          <DateField
            id="paymentAt"
            format="DD/MM/YYYY"
            disabled={readOnly}/>
        </Form.Item>
        <Divider orientation="left">Coinversi??n</Divider>
        <Space className="wrapper-number">
          <Form.Item
            label="FICOSEC:"
            name="ficosecPayment"
            rules={[{ required: true, message: "El campo es requerido" }]}>
            <InputNumber
              name="ficosecPayment"
              onChange={(value) => onChange("ficosecPaymentPercentage", value)}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              disabled={readOnly}/>
          </Form.Item>
          <Typography.Title level={4}>{`${state?.ficosecPaymentPercentage}%`}</Typography.Title>
        </Space>
        <Space className="wrapper-number">
          <Form.Item
            label="Coinversi??n 1:"
            name="investmentOnePayment"
            initialValue={0}>
            <InputNumber
              name="investmentOnePayment"
              onChange={(value) => onChange("investmentOnePaymentPercentage", value)}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              disabled={readOnly}/>
          </Form.Item>
          <Typography.Title level={4}>{`${state?.investmentOnePaymentPercentage}%`}</Typography.Title>
        </Space>
        <Space className="wrapper-number">
          <Form.Item
            label="Coinversi??n 2:"
            name="investmentTwoPayment"
            initialValue={0}>
            <InputNumber
              name="investmentTwoPayment"
              onChange={(value) => onChange("investmentTwoPaymentPercentage", value)}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              disabled={readOnly}/>
          </Form.Item>
          <Typography.Title level={4}>{`${state?.investmentTwoPaymentPercentage}%`}</Typography.Title>
        </Space>
        <Space className="wrapper-number">
          <Form.Item
            label="Implementadora:"
            name="implementerPayment"
            rules={[{ required: true, message: "El campo es requerido" }]}>
            <InputNumber
              name="implementerPayment"
              onChange={(value) => onChange("implementerPaymentPercentage", value)}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              disabled={readOnly}/>
          </Form.Item>
          <Typography.Title level={4}>{`${state?.implementerPaymentPercentage}%`}</Typography.Title>
        </Space>
        <Form.Item
          hidden
          label="Uso del presupuesto:"
          name="percentage">
          <InputNumber name="percentage" readOnly />
        </Form.Item>
      </Form>
    </Modal>
  )
}
