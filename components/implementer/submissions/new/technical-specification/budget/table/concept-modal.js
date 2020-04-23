import { useForm } from "antd/lib/form/util"
import { Modal, Form, Row, Col, Input } from "antd"
import { merge } from "lodash"
import { useEffect } from "react"
import { implementer } from "../../../../../../../helpers/selectOptions"
import {
  MonthlyDistributionField,
  InvestmentDistributionField
} from "../fields"
import { SelectField } from "../../../../../../shared"

export function ConceptModal({
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
      title={`${edit ? "Editar" : "Agregar"} concepto`}
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
              name="name"
              style={{display: "inline"}}
              label="Descripción">
              <Input
                id="name"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="region"
              style={{display: "inline"}}
              label="Región">
              <SelectField
                id="region"
                name="region"
                defaultValue={edit?.region}
                options={implementer.submission.regions} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type"
              style={{display: "inline"}}
              label="Tipo de gasto">
              <SelectField
                id="type"
                name="type"
                defaultValue={edit?.type}
                options={implementer.submission.conceptTypes} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="measurementUnit"
              style={{display: "inline"}}
              label="Unidad de medida">
              <Input
                id="measurementUnit"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="unitCost"
              style={{display: "inline"}}
              label="Costo unitario">
              <Input
                id="unitCost"
                type="text"
                prefix="$" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="unitAmmount"
              style={{display: "inline"}}
              label="Total de unidades">
              <Input
                id="unitAmmount"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="monthlyDistribution"
              style={{display: "inline"}}
              label="Distribución mensual">
              <MonthlyDistributionField />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="investmentDistribution">
              <InvestmentDistributionField />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
