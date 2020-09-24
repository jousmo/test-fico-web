import { Modal, Form, Row, Col, Input } from "antd"
import {
  FieldLabel,
  MultipleTextField,
  MultipleDateRangeField
} from "../../../shared"
import { merge } from "lodash"
import { useEffect } from "react"

export function ActivityModal({
  activityType,
  objectiveIndex,
  onSave,
  onCancel,
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
      title={`${edit ? "Editar" : "Agregar"} indicador`}
      onOk={onOk}
      onCancel={onCancelModal}
      okButtonProps={{ disabled: review }}
      width={800}
      okText={`${edit ? "Guardar" : "Agregar"}`}
      cancelText={review ? "Cerrar" : "Cancelar"}
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
                  name: "title",
                  section: activityType,
                  index: commentIndex}}>
                  Título de la actividad
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
                  hidden: hiddenComments,
                  name: "description",
                  section: activityType,
                  index: commentIndex}}>
                  Descripción de la actividad
                </FieldLabel>
              }>
              <Input
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
                  name: "responsible",
                  section: activityType,
                  index: commentIndex}}>
                  Responsable
                </FieldLabel>
              }>
              <Input
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
                  name: "methodology",
                  section: activityType,
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
                  hidden: hiddenComments,
                  name: "formula",
                  section: activityType,
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
                  hidden: hiddenComments,
                  name: "meansOfVerification",
                  section: activityType,
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
                  hidden: hiddenComments,
                  name: "baseline",
                  section: activityType,
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
                  hidden: hiddenComments,
                  name: "goal",
                  section: activityType,
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
              name="place"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  hidden: hiddenComments,
                  name: "place",
                  section: activityType,
                  index: commentIndex}}>
                  Lugar de intervención
                </FieldLabel>
              }>
              <Input
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
                  name: "months",
                  section: activityType,
                  index: commentIndex}}>
                  Meses de implementación
                </FieldLabel>
              }>
              <MultipleDateRangeField
                isAddDisabled={review}
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
                  name: "inputs",
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
                  name: "products",
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
