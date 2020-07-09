import { useForm } from "antd/lib/form/util"
import { Modal, Form, Row, Col, Input } from "antd"
import {
  CompositeField,
  DateField,
  DeleteButton,
  FieldLabel, MultipleTextField
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
              name="title"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
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
              name="methodology"
              style={{display: "inline"}}
              label={
                <FieldLabel comentable={{
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
                      <Row
                        gutter={[10, 8]}
                        justify="start"
                        key={`date_${item.uuid}`}>
                        <Col span={24}>
                          <DateField
                            defaultValue={item.months}
                            id="months"
                            name="months"
                            onChange={updateItem(index)}
                            picker="month"
                            range
                            style={{width: "90%"}} />
                          <DeleteButton onClick={removeItem(index)} />
                        </Col>
                      </Row>
                    ) }
                  </div>
                }
              </CompositeField>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="inputs"
              style={{display: "inline"}}
              label="Insumos">
              <MultipleTextField
                addLabel="Agregar insumo" />
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
