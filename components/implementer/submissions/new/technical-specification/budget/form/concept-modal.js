import { useForm } from "antd/lib/form/util"
import { Modal, Form, Row, Col, Input, Typography } from "antd"
import { merge } from "lodash"
import { useEffect, useState } from "react"
import { implementer } from "../../../../../../../helpers/selectOptions"
import {
  MonthlyDistributionField,
  InvestmentDistributionField
} from "../fields"
import { SelectField, FieldLabel } from "../../../../../../shared"
import Moment from "moment"
import { extendMoment } from "moment-range"
import { getSelectValue } from "../../../../../../../helpers"
const moment = extendMoment(Moment)
moment.locale("es")

export function ConceptModal({
  onSave,
  onCancel,
  edit,
  submission,
  ...props
}) {
  const [form] = useForm()
  const [state, setState] = useState({})

  useEffect(() => {
    if(edit) {
      form.setFieldsValue(edit)
      setState(edit)
    }
  }, [edit])

  const projectMonths = Array
      .from(
        moment
          .range(
            moment(submission?.startDate) || moment(),
            moment(submission?.endDate) || moment())
          .by("month")
      )
      .map(r => r.format("MMMM YYYY"))

  const onOk = async () => {
    try {
      let values = await form.getFieldsValue()

      if(typeof edit?.index !== "undefined") {
        values.index = edit.index
        values = merge(edit, values)
      }

      onSave(values)
    }
    catch(e) {
      console.error(e)
    }
  }

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
  }

  const onFormChange = () => {
    setState(form.getFieldsValue())
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
        onChange={onFormChange}
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
              label="Región"
              getValueFromEvent={getSelectValue}>
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
              label="Tipo de gasto"
              getValueFromEvent={getSelectValue}>
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
                defaultValue={edit?.measurementUnit}
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
                defaultValue={edit?.unitCost}
                type="number"
                prefix="$" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="totalUnits"
              style={{display: "inline"}}
              label="Total de unidades">
              <Input
                id="totalUnits"
                defaultValue={edit?.totalUnits}
                type="number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="monthlyDistribution"
              style={{display: "inline"}}
              label={<FieldLabel>
                Distribución mensual
                <br />
                <Typography.Text type="secondary">
                  Selecciona el número de unidades que utilizarás por mes. 20
                  unidades máximo por mes.
                </Typography.Text>
              </FieldLabel>}>
              <MonthlyDistributionField
                defaultValue={edit?.monthlyDistribution}
                unitCost={state.unitCost}
                months={projectMonths} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="investmentDistribution"
              style={{display: "inline"}}
              label={<FieldLabel>
                Distribución de la inversión
                <br />
                <Typography.Text type="secondary">
                  Distribuye el monto de inversión de cada entidad involucrada.
                </Typography.Text>
              </FieldLabel>}>
              <InvestmentDistributionField
                defaultValue={edit?.investmentDistribution}
                unitCost={state.unitCost}
                unitAmmount={state.totalUnits} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
