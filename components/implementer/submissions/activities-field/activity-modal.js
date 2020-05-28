import { useForm } from "antd/lib/form/util"
import { Modal, Form, Row, Col, Input } from "antd"
import { DateField, FieldLabel } from "../../../shared"
import { getSelectValue } from "../../../../helpers/getSelectValue"
import { merge } from "lodash"
import { useEffect } from "react"

export function ActivityModal({
  activityType,
  onSave,
  onCancel,
  edit,
  ...props
}) {
  const [form] = useForm()

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
              name="description"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  name: "description",
                  section: activityType,
                  index: edit?.index}}>
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
                  name: "responsible",
                  section: activityType,
                  index: edit?.index}}>
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
              name="meansOfVerification"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
                  name: "meansOfVerification",
                  section: activityType,
                  index: edit?.index}}>
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
                  section: activityType,
                  index: edit?.index}}>
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
                  section: activityType,
                  index: edit?.index}}>
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
                  name: "place",
                  section: activityType,
                  index: edit?.index}}>
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
                  name: "months",
                  section: activityType,
                  index: edit?.index}}>
                  Mes de implementación
                </FieldLabel>
              }
              getValueFromEvent={getSelectValue}>
              <DateField
                id="months"
                picker="month"
                range
                fullWidth />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
