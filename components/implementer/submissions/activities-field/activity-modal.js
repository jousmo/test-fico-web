import { useForm } from "antd/lib/form/util"
import { Modal, Form, Row, Col, Input } from "antd"
import {
  CompositeField,
  DateField,
  DeleteButton,
  FieldLabel
} from "../../../shared"
import { merge } from "lodash"
import { useEffect } from "react"

export function ActivityModal({
  activityType,
  objectiveIndex,
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

  const onAddMonths = (addNew) => {
    addNew({ months: undefined })
  }

  const commentIndex = `${objectiveIndex}-${edit?.index}`

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
              name="meansOfVerification"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
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
                  name: "months",
                  section: activityType,
                  index: commentIndex}}>
                  Meses de implementación
                </FieldLabel>
              }>
              <CompositeField
                onClickAdd={onAddMonths}
                addLabel="Agregar fecha">
                {({ items, updateItem, removeItem }) =>
                  <div>
                    { items.map((item, index) =>
                      <Row gutter={[10, 8]} justify="start" key={index}>
                        <Col span={24}>
                          <Form.Item
                            style={{display: "inline"}}>
                            <DateField
                              defaultValue={item.months}
                              id="months"
                              name="months"
                              onChange={updateItem(index)}
                              picker="month"
                              range
                              style={{width: "90%"}} />
                            <DeleteButton onClick={removeItem(index)} />
                          </Form.Item>
                        </Col>
                      </Row>
                    ) }
                  </div>
                }
              </CompositeField>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
