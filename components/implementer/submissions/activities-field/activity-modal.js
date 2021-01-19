import { Modal, Form, Row, Col, Input } from "antd"
import {
  FieldLabel,
  SelectField,
  MultipleTextField,
  MultipleDateRangeField
} from "../../../shared"
import { merge } from "lodash"
import { useEffect } from "react"
import { getSelectValue } from "../../../../helpers"
import { verificationTypes } from "../../../../helpers/selectOptions/implementer/submission"

export function ActivityModal({
  activityType,
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
        edit.months = null
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

  const commentIndex = `${objectiveIndex}-${edit?.index}`

  return (
    <Modal
      title={`${edit ? "Editar" : "Agregar"} actividad`}
      onOk={onOk}
      onCancel={onCancelModal}
      okButtonProps={{ disabled: review }}
      width={800}
      okText={`${edit ? "Guardar" : "Agregar"}`}
      cancelText={review ? "Cerrar" : "Cancelar"}
      maskClosable={false}
      {...props}
    >
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
                  name: `title-${objectiveIndex}`,
                  section: activityType,
                  index: commentIndex}}>
                  Título de la actividad
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
                  name: `description-${objectiveIndex}`,
                  section: activityType,
                  index: commentIndex}}>
                  Descripción de indicador
                </FieldLabel>
              }>
              <Input.TextArea
                autoSize
                id="description"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="responsible"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  name: `responsible-${objectiveIndex}`,
                  section: activityType,
                  index: commentIndex}}>
                  Responsable
                </FieldLabel>
              }>
              <Input.TextArea
                autoSize
                id="responsible"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="methodology"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  name: `methodology-${objectiveIndex}`,
                  section: activityType,
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
                  name: `formula-${objectiveIndex}`,
                  section: activityType,
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
                  name: `meansOfVerification-${objectiveIndex}`,
                  section: activityType,
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
                  name: `baseline-${objectiveIndex}`,
                  section: activityType,
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
                  name: `goal-${objectiveIndex}`,
                  section: activityType,
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
              name="place"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  name: `place-${objectiveIndex}`,
                  section: activityType,
                  index: commentIndex}}>
                  Lugar de intervención
                </FieldLabel>
              }>
              <Input.TextArea
                autoSize
                id="place"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="months"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  name: `months-${objectiveIndex}`,
                  section: activityType,
                  index: commentIndex}}>
                  Meses de implementación
                </FieldLabel>
              }>
              <MultipleDateRangeField
                isAddDisabled={review}
                limitDates={limitDates}
                review={review} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="inputs"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  name: `inputs-${objectiveIndex}`,
                  section: activityType,
                  index: commentIndex}}>
                  Insumos
                </FieldLabel>
              }>
              <MultipleTextField
                isAddDisabled={review}
                addLabel="Agregar insumo"
                review={review} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="products"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  name: `products-${objectiveIndex}`,
                  section: activityType,
                  index: commentIndex}}>
                  Productos
                </FieldLabel>
              }>
              <MultipleTextField
                isAddDisabled={review}
                addLabel="Agregar producto"
                review={review} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
