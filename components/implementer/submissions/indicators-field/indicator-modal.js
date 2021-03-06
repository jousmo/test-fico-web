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
  readOnly,
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
        edit.meansOfVerification = null
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
      okButtonProps={{ disabled: review || readOnly }}
      width={800}
      okText={`${edit ? "Guardar" : "Agregar"}`}
      cancelText={(review || readOnly) ? "Cerrar" : "Cancelar"}
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
                  T??tulo del indicador
                </FieldLabel>
              }>
              <Input.TextArea
                autoSize
                disabled={readOnly}
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
                  Descripci??n
                </FieldLabel>
              }>
              <Input.TextArea
                autoSize
                disabled={readOnly}
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
                  Metodolog??a
                </FieldLabel>
              }>
              <Input.TextArea
                autoSize
                disabled={readOnly}
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
                  F??rmula
                </FieldLabel>
              }>
              <Input.TextArea
                autoSize
                disabled={readOnly}
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
                  Medio de verificaci??n
                </FieldLabel>
              }
              getValueFromEvent={getSelectValue}>
              <SelectField
                id="meansOfVerification"
                disabled={readOnly}
                filterOption={(value, option) => option?.children?.toLowerCase().includes(value?.toLowerCase())}
                mode="tags"
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
                  L??nea base
                </FieldLabel>
              }>
              <Input.TextArea
                autoSize
                disabled={readOnly}
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
                disabled={readOnly}
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
                disabled={readOnly}
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
                disabled={readOnly}
                disabledDate={date => date && (date < moment(limitDates[0]) || date > moment(limitDates[1]))}
                fullWidth
                format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="measurementPeriodicity"
              style={{display: "inline"}}
              label="Periodicidad de medici??n"
              getValueFromEvent={getSelectValue}>
              <SelectField
                disabled={readOnly}
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
                isAddDisabled={review || readOnly}
                review={review || readOnly}
                addLabel="Agregar producto" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
