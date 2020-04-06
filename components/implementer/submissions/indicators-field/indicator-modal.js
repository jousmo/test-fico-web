import { useForm } from "antd/lib/form/util"
import { Modal, Form, Row, Col, Input } from "antd"
import { DateField, SelectField, MultipleTextField } from "../../../shared"
import { getSelectValue } from "../../../../helpers/getSelectValue"
import {
  measurementPeriodicityTypes
} from "../../../../helpers/selectOptions/implementer/submission"
import { merge } from "lodash"

export function IndicatorModal({
  onSave,
  onCancel,
  edit,
  ...props
}) {
  const [form] = useForm()

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

  return (
    <Modal
      title={`${edit ? "Editar" : "Agregar"} indicador`}
      onOk={onOk}
      onCancel={onCancel}
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
                type="text"
                defaultValue={edit?.title} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="narrativeSummary"
              style={{display: "inline"}}
              label="Resumen narrativo">
              <Input
                id="narrativeSummary"
                type="text"
                defaultValue={edit?.narrativeSummary} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="methodology"
              style={{display: "inline"}}
              label="Metodología">
              <Input
                id="methodology"
                type="text"
                defaultValue={edit?.methodology} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="responsible"
              style={{display: "inline"}}
              label="Responsable">
              <Input
                id="responsible"
                type="text"
                defaultValue={edit?.responsible} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="formula"
              style={{display: "inline"}}
              label="Fórmula">
              <Input
                id="formula"
                type="text"
                defaultValue={edit?.formula} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="meansOfVerification"
              style={{display: "inline"}}
              label="Medio de verificación">
              <Input
                id="meansOfVerification"
                type="text"
                defaultValue={edit?.meansOfVerification} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="baseline"
              style={{display: "inline"}}
              label="Línea base">
              <Input
                id="baseline"
                type="text"
                defaultValue={edit?.baseline} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="goal"
              style={{display: "inline"}}
              label="Meta">
              <Input
                id="goal"
                type="text"
                defaultValue={edit?.goal} />
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
                fullWidth
                defaultValue={edit?.startDate} />
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
                fullWidth
                defaultValue={edit?.endDate} />
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
                options={measurementPeriodicityTypes}
                defaultValue={edit?.measurementPeriodicity} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="place"
              style={{display: "inline"}}
              label="Lugar de intervención">
              <Input
                id="place"
                type="text"
                defaultValue={edit?.place} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="inputs"
              style={{display: "inline"}}
              label="Insumos">
              <MultipleTextField
                addLabel="Agregar insumo"
                defaultValue={edit?.inputs} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="products"
              style={{display: "inline"}}
              label="Productos">
              <MultipleTextField
                addLabel="Agregar producto"
                defaultValue={edit?.products} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
