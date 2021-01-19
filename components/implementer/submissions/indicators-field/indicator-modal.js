import { Modal, Form, Row, Col, Input } from "antd"
import {
  DateField,
  FieldLabel,
  SelectField,
  MultipleTextField
} from "../../../shared"
import { getSelectValue } from "../../../../helpers/getSelectValue"
import {
  measurementPeriodicityTypes,
  verificationTypes
} from "../../../../helpers/selectOptions/implementer/submission"
import { merge } from "lodash"
import { useEffect } from "react"
import moment from "moment"

export function IndicatorModal({
  indicatorType,
  objectiveIndex,
  onSave,
  onCancel,
  limitDates,
  edit,
  hiddenComments,
  review,
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
      okButtonProps={{ disabled: review }}
      width={800}
      okText={`${edit ? "Guardar" : "Agregar"}`}
      cancelText={review ? "Cerrar" : "Cancelar"}
      maskClosable={false}
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
                  hidden: hiddenComments,
                  name: `title-${objectiveIndex || 0}`,
                  section: indicatorType,
                  index: commentIndex}}>
                  Título del indicador
                </FieldLabel>
              }>
              <Input.TextArea
                autoSize
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
                  hidden: hiddenComments,
                  name: `description-${objectiveIndex || 0}`,
                  section: indicatorType,
                  index: commentIndex}}>
                  Descripción
                </FieldLabel>
              }>
              <Input.TextArea
                autoSize
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
                  hidden: hiddenComments,
                  name: `methodology-${objectiveIndex || 0}`,
                  section: indicatorType,
                  index: commentIndex}}>
                  Metodología
                </FieldLabel>
              }>
              <Input.TextArea
                autoSize
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
                  hidden: hiddenComments,
                  name: `formula-${objectiveIndex || 0}`,
                  section: indicatorType,
                  index: commentIndex}}>
                  Fórmula
                </FieldLabel>
              }>
              <Input.TextArea
                autoSize
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
                  hidden: hiddenComments,
                  name: `meansOfVerification-${objectiveIndex || 0}`,
                  section: indicatorType,
                  index: commentIndex}}>
                  Medio de verificación
                </FieldLabel>
              }
              getValueFromEvent={getSelectValue}>
              <SelectField
                id="meansOfVerification"
                filterOption={(value, option) => option.children.toLowerCase().includes(value.toLowerCase())}
                showSearch
                options={verificationTypes} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="baseline"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  name: `baseline-${objectiveIndex || 0}`,
                  section: indicatorType,
                  index: commentIndex}}>
                  Línea base
                </FieldLabel>
              }>
              <Input.TextArea
                autoSize
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
                  hidden: hiddenComments,
                  name: `goal-${objectiveIndex || 0}`,
                  section: indicatorType,
                  index: commentIndex}}>
                  Meta
                </FieldLabel>
              }>
              <Input
                autoSize
                id="goal"
                type="number" />
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
                disabledDate={date => date && (date < moment(limitDates[0]) || date > moment(limitDates[1]))}
                fullWidth
                format="DD/MM/YYYY" />
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
                disabledDate={date => date && (date < moment(limitDates[0]) || date > moment(limitDates[1]))}
                fullWidth
                format="DD/MM/YYYY" />
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
