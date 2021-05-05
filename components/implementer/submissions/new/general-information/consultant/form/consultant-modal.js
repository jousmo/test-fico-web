import { Modal, Form, Row, Col, Input, Empty, Typography } from "antd"
import { useEffect, useState } from "react"
import {
  CompositeField,
  DateField,
  DeleteButton,
  FieldLabel,
  RadioField,
  Visibility,
  UploadButtonForm
} from "../../../../../../shared"
import {
  getSelectValue,
  selectOptions,
  toFileList
} from "../../../../../../../helpers"
import { merge } from "lodash"
import moment from "moment"

export function ConsultantModal({ edit, onCancel, onSave, limitDates, hiddenComments, review, readOnly, ...props }) {
  const [form] = Form.useForm()
  const [state, setState] = useState({
    hasSupport: false,
    personType: undefined
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
      values.supports = values?.supports?.map(el => ({ ...el, amount: +el.amount }))

      if(typeof edit?.index !== "undefined") {
        values.index = edit.index
        edit.supports = null
        edit.documents = null
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

  const onDoneFile = async files => {
    const documents = files?.map(el => {
      return { name: el.name, url: el.url }
    })

    try {
      await form.setFieldsValue({ documents })
    }
    catch (e) {
      console.error(e)
    }
  }

  const onRemoveFile = async ({ url }) => {
    const oldDocuments = form.getFieldValue("documents")
    const documents = oldDocuments?.filter(document => document.url !== url)

    await form.setFieldsValue({ documents })
  }

  return (
    <Modal
      title={`${edit ? "Editar" : "Agregar"} consultor`}
      onOk={onOk}
      onCancel={onCancelModal}
      okText={`${edit ? "Guardar" : "Agregar"}`}
      okButtonProps={{ disabled: review || readOnly }}
      cancelText={review ? "Cerrar" : "Cancelar"}
      width={800}
      maskClosable={false}
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
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  index: edit?.index,
                  name: "description",
                  section: "CONSULTANT"}}>
                  Describe el perfil del consultor
                </FieldLabel>
              }>
              <Input.TextArea
                id="description"
                name="description"
                disabled={readOnly}
                autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="commercialName"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  index: edit?.index,
                  name: "commercialName",
                  section: "CONSULTANT"}}>
                  Nombre comercial
                </FieldLabel>
              }>
              <Input
                id="commercialName"
                name="commercialName"
                disabled={readOnly}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="commercialAddress"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  index: edit?.index,
                  name: "commercialAddress",
                  section: "CONSULTANT"}}>
                  Dirección comercial
                </FieldLabel>
              }>
              <Input
                id="commercialAddress"
                name="commercialAddress"
                disabled={readOnly}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="contactName"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  index: edit?.index,
                  name: "contactName",
                  section: "CONSULTANT"}}>
                  Contacto responsable
                </FieldLabel>
              }>
              <Input
                id="contactName"
                name="contactName"
                disabled={readOnly}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  index: edit?.index,
                  name: "phone",
                  section: "CONSULTANT"}}>
                  Número de teléfono
                </FieldLabel>
              }>
              <Input
                id="phone"
                name="phone"
                disabled={readOnly}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="rfc"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  index: edit?.index,
                  name: "rfc",
                  section: "CONSULTANT"}}>
                  RFC
                </FieldLabel>
              }>
              <Input
                id="rfc"
                name="rfc"
                disabled={readOnly}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="fiscalAddress"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  index: edit?.index,
                  name: "fiscalAddress",
                  section: "CONSULTANT"}}>
                  Dirección fiscal
                </FieldLabel>
              }>
              <Input
                id="fiscalAddress"
                name="fiscalAddress"
                disabled={readOnly}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="fiscalPersonType"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  index: edit?.index,
                  name: "fiscalPersonType",
                  section: "CONSULTANT"}}>
                  Tipo de persona
                </FieldLabel>
              }
              getValueFromEvent={onTypeChange}>
              <RadioField
                id="fiscalPersonType"
                name="fiscalPersonType"
                disabled={readOnly}
                options={selectOptions.implementer.submission
                  .fiscalPersonTypes} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="documents"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  index: edit?.index,
                  name: "documents",
                  section: "CONSULTANT"}}>
                  <>
                    Documentos
                    {state.personType && (
                      <>
                        <br/>
                        <Typography.Text>{getTooltipBody()}</Typography.Text>
                      </>
                    )}
                  </>
                </FieldLabel>
              }>
              <UploadButtonForm
                disabled={readOnly}
                fileList={toFileList(edit?.documents) || []}
                onRemoveFile={onRemoveFile}
                onChange={onDoneFile}
                maxFile={5}
                accept={"application/pdf"}>
                Adjuntar documentos
              </UploadButtonForm>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="hadReceivedSupports"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  index: edit?.index,
                  name: "hadReceivedSupports",
                  section: "CONSULTANT"}}>
                  ¿Ha recibido apoyos de FICOSEC?
                </FieldLabel>
              }
              getValueFromEvent={getSelectValue}>
              <RadioField
                id="hadReceivedSupports"
                name="hadReceivedSupports"
                disabled={readOnly}
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
                  isAddDisabled={readOnly}
                  addLabel="Agregar apoyo">
                  {({ items, updateItem, removeItem }) =>
                    <div>
                      { items?.map((item, index) =>
                        <Row
                          gutter={[10, 8]}
                          justify="start"
                          key={`support_${item.name}_${index}`}>
                          <Col span={8}>
                            <Form.Item
                              style={{display: "inline"}}
                              label="Nombre del proyecto">
                              <Input
                                id="name"
                                name="name"
                                disabled={readOnly}
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
                                id="receivedAt"
                                name="receivedAt"
                                disabled={readOnly}
                                disabledDate={date => date && (date < moment(limitDates[0]) || date > moment(limitDates[1]))}
                                defaultValue={item.receivedAt}
                                onChange={updateItem(index)}
                                format="DD/MM/YYYY"
                                fullWidth />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              style={{display: "inline"}}
                              label="Monto recibido">
                              <Input
                                type="number"
                                style={{width: "auto"}}
                                addonBefore="$"
                                id="amount"
                                name="amount"
                                disabled={readOnly}
                                onBlur={updateItem(index)}
                                defaultValue={item.amount} />
                              {!readOnly &&
                                <DeleteButton onClick={removeItem(index)} />
                              }
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
