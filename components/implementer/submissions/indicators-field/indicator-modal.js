import { Modal, Form, Row, Col, Input } from "antd"
import {
  DateField,
  FieldLabel,
  SelectField,
  MultipleTextField
} from "../../../shared"
import { getSelectValue } from "../../../../helpers/getSelectValue"
import {
  measurementPeriodicityTypes
} from "../../../../helpers/selectOptions/implementer/submission"
import { merge } from "lodash"
import { useEffect } from "react"

export function IndicatorModal({
  indicatorType,
  objectiveIndex,
  onSave,
  onCancel,
  edit,
  ...props
}) {
  const [form] = Form.useForm()

  useEffect(() => {
    if(edit) {
      form.setFieldsValue(edit)
    }
  }, [edit])

  const onOk = async () => {
    try {
      let values = await form.getFieldsValue()

      if(typeof edit?.index !== "undefined") {
        values.index = edit.index
        edit.products = null
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

  let commentIndex
  if (indicatorType === "SPECIFIC_INDICATOR"){
    commentIndex = `${objectiveIndex}-${edit?.index}`
  } else {
    commentIndex = edit?.index
  }

  return (
    <Modal
      title={`${edit ? "Editar" : "Agregar"} indicador`}
      onOk={onOk}
      onCancel={onCancelModal}
      width={800}
      okText={`${edit ? "Guardar" : "Agregar"}`}
      cancelText="Cancelar"
      {...props}>
      <Form
        form={form}
        name="indicator-form"
        layout="vertical">
        <Row gutter={[10, 8]} justify="start">
          <Col span={24}>
            <Form.Item
              name="title"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  name: "title",
                  section: indicatorType,
                  index: commentIndex}}>
                  Título del indicador
                </FieldLabel>
              }>
              <Input
                id="title"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  name: "description",
                  section: indicatorType,
                  index: commentIndex}}>
                  Descripción
                </FieldLabel>
              }>
              <Input
                id="description"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="methodology"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  name: "methodology",
                  section: indicatorType,
                  index: commentIndex}}>
                  Metodología
                </FieldLabel>
              }>
              <Input
                id="methodology"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="formula"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  name: "formula",
                  section: indicatorType,
                  index: commentIndex}}>
                  Fórmula
                </FieldLabel>
              }>
              <Input
                id="formula"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="meansOfVerification"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  name: "meansOfVerification",
                  section: indicatorType,
                  index: commentIndex}}>
                  Medio de verificación
                </FieldLabel>
              }>
              <Input
                id="meansOfVerification"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="baseline"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  name: "baseline",
                  section: indicatorType,
                  index: commentIndex}}>
                  Línea base
                </FieldLabel>
              }>
              <Input
                id="baseline"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="goal"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  name: "goal",
                  section: indicatorType,
                  index: commentIndex}}>
                  Meta
                </FieldLabel>
              }>
              <Input
                id="goal"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="startDate"
              style={{display: "inline"}}
              label="Fecha de inicio"
              getValueFromEvent={getSelectValue}>
              <DateField
                id="startDate"
                fullWidth />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="endDate"
              style={{display: "inline"}}
              label="Fecha fin"
              getValueFromEvent={getSelectValue}>
              <DateField
                id="endDate"
                fullWidth />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="measurementPeriodicity"
              style={{display: "inline"}}
              label="Periodicidad de medición"
              getValueFromEvent={getSelectValue}>
              <SelectField
                id="measurementPeriodicity"
                options={measurementPeriodicityTypes} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="products"
              style={{display: "inline"}}
              label="Productos">
              <MultipleTextField
                addLabel="Agregar producto" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
