import { useForm } from "antd/lib/form/util"
import { Modal, Form, Row, Col, Input } from "antd"
import { DateField, SelectField, MultipleTextField } from "../../../shared"
import { getSelectValue } from "../../../../helpers/getSelectValue"
import {
  measurementPeriodicityTypes
} from "../../../../helpers/selectOptions/implementer/submission"
import { merge } from "lodash"
import { useEffect } from "react"

export function ActivityModal({
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
              name="title"
              style={{display: "inline"}}
              label="Título del indicador">
              <Input
                id="title"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="narrativeSummary"
              style={{display: "inline"}}
              label="Resumen narrativo">
              <Input
                id="narrativeSummary"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="methodology"
              style={{display: "inline"}}
              label="Metodología">
              <Input
                id="methodology"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="responsible"
              style={{display: "inline"}}
              label="Responsable">
              <Input
                id="responsible"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="formula"
              style={{display: "inline"}}
              label="Fórmula">
              <Input
                id="formula"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="meansOfVerification"
              style={{display: "inline"}}
              label="Medio de verificación">
              <Input
                id="meansOfVerification"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="baseline"
              style={{display: "inline"}}
              label="Línea base">
              <Input
                id="baseline"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="goal"
              style={{display: "inline"}}
              label="Meta">
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
          <Col span={12}>
            <Form.Item
              name="place"
              style={{display: "inline"}}
              label="Lugar de intervención">
              <Input
                id="place"
                type="text" />
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
