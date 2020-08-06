import { Modal, Form, Row, Col, Input, Empty } from "antd"
import { useEffect, useState } from "react"
import {
  CompositeField,
  DateField,
  DeleteButton,
  FieldLabel,
  RadioField,
  UploadTooltip,
  Visibility
} from "../../../../../../shared"
import { getSelectValue, selectOptions } from "../../../../../../../helpers"
import { merge } from "lodash"

export function ConsultantModal({edit, onCancel, onSave, ...props}) {
  const [form] = Form.useForm()
  const [state, setState] = useState({
    hasSupport: false,
    personType: "NATURAL_PERSON"
  })

  useEffect(() => {
    if(edit) {
      form.setFieldsValue(edit)
      setState({
        hasSupport: edit.hadReceivedSupports,
        personType: edit.fiscalPersonType
      })
    }
  }, [edit])

  const onOk = async () => {
    try {
      let values = await form.getFieldsValue()

      if(typeof edit?.index !== "undefined") {
        values.index = edit.index
        edit.supports = null
        values = merge(edit, values)
      }

      onSave(values)
      form.resetFields()
    }
    catch(e) {
      console.error(e)
    }
  }

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
  }

  const onAddSupport = (addNew) => {
    addNew({
      name: "",
      date: undefined,
      amount: undefined
    })
  }

  const onTypeChange = (selectValue) => {
    const value = getSelectValue(selectValue)
    setState({ ...state, personType: value })
    return value
  }

  const getTooltipBody = () => {
    let document
    if (state.personType === "NATURAL_PERSON"){
      document = "Identificación, "
    } else {
      document = "Acta constitutiva, "
    }
    document += `constancia de situación fiscal, cotización firmada y CV
    empresarial y de los consultores`
    return document
  }

  return (
    <Modal
      title={`${edit ? "Editar" : "Agregar"} consultor`}
      onOk={onOk}
      onCancel={onCancelModal}
      okText={`${edit ? "Guardar" : "Agregar"}`}
      cancelText="Cancelar"
      width={800}
      {...props}>
      <Form
        form={form}
        name="consultant-form"
        layout="vertical">
        <Row gutter={[10, 8]} justify="start">
          <Col span={24}>
            <Form.Item
              name="description"
              style={{display: "inline"}}
              label="Describe el perfil del consultor">
              <Input.TextArea
                id="description"
                name="description"
                autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="commercialName"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  index: edit?.index,
                  name: "commercialName",
                  section: "CONSULTANT"}}>
                  Nombre comercial
                </FieldLabel>
              }>
              <Input
                id="commercialName"
                name="commercialName"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="commercialAddress"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  index: edit?.index,
                  name: "commercialAddress",
                  section: "CONSULTANT"}}>
                  Dirección comercial
                </FieldLabel>
              }>
              <Input
                id="commercialAddress"
                name="commercialAddress"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="contactName"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  index: edit?.index,
                  name: "contactName",
                  section: "CONSULTANT"}}>
                  Contacto responsable
                </FieldLabel>
              }>
              <Input
                id="contactName"
                name="contactName"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  index: edit?.index,
                  name: "phone",
                  section: "CONSULTANT"}}>
                  Número de teléfono
                </FieldLabel>
              }>
              <Input
                id="phone"
                name="phone"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="rfc"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  index: edit?.index,
                  name: "rfc",
                  section: "CONSULTANT"}}>
                  RFC
                </FieldLabel>
              }>
              <Input
                id="rfc"
                name="rfc"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="fiscalAddress"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  index: edit?.index,
                  name: "fiscalAddress",
                  section: "CONSULTANT"}}>
                  Dirección fiscal
                </FieldLabel>
              }>
              <Input
                id="fiscalAddress"
                name="fiscalAddress"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="fiscalPersonType"
              style={{display: "inline"}}
              label="Tipo de persona"
              getValueFromEvent={onTypeChange}>
              <RadioField
                id="fiscalPersonType"
                name="fiscalPersonType"
                options={selectOptions.implementer.submission
                  .fiscalPersonTypes} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="documents"
              style={{display: "inline"}}
              label="Documentos">
              <UploadTooltip body={getTooltipBody()}/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="hadReceivedSupports"
              style={{display: "inline"}}
              label="¿Ha recibido apoyos de FICOSEC"
              getValueFromEvent={getSelectValue}>
              <RadioField
                id="hadReceivedSupports"
                name="hadReceivedSupports"
                onChange={(v) =>
                  setState({ ...state, hasSupport: getSelectValue(v) })
                }
                options={selectOptions.shared.yesNo} />
            </Form.Item>
          </Col>
          <Visibility visible={state.hasSupport}>
            <Col span={24}>
              <Form.Item
                name="supports"
                style={{display: "inline"}}
                label="Agrega los apoyos que has recibido por parte de FICOSEC">
                <CompositeField
                  onClickAdd={onAddSupport}
                  addLabel="Agregar apoyo">
                  {({ items, updateItem, removeItem }) =>
                    <div>
                      { items.map((item, index) =>
                        <Row
                          gutter={[10, 8]}
                          justify="start"
                          key={`support_${item.uuid}`}>
                          <Col span={8}>
                            <Form.Item
                              style={{display: "inline"}}
                              label="Nombre del proyecto">
                              <Input
                                id="name"
                                name="name"
                                defaultValue={item.name}
                                onBlur={updateItem(index)}
                                type="text" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              style={{display: "inline"}}
                              label="Fecha">
                              <DateField
                                id="date"
                                name="date"
                                defaultValue={item.date}
                                onChange={updateItem(index)}
                                fullWidth />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              style={{display: "inline"}}
                              label="Monto recibido">
                              <Input
                                style={{width: "auto"}}
                                addonBefore="$"
                                id="amount"
                                name="amount"
                                onBlur={updateItem(index)}
                                defaultValue={item.amount} />
                              <DeleteButton onClick={removeItem(index)} />
                            </Form.Item>
                          </Col>
                        </Row>
                      ) }
                      { !items.length ?
                        <Empty
                          style={{marginBottom: "10px"}}
                          description="Agrega apoyos haciendo click
                          en el botón de abajo" />
                        : null }
                    </div>
                  }
                </CompositeField>
              </Form.Item>
            </Col>
          </Visibility>
        </Row>
      </Form>
    </Modal>
  )
}
