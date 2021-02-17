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
import numeral from "numeral"

export function ConceptModal({
  onSave,
  onCancel,
  edit,
  submission,
  readOnly,
  ...props
}) {
  const hasRegion = !submission?.township?.includes("Zona centro sur")

  const [form] = Form.useForm()
  const [state, setState] = useState({})
  const [investmentState, setInvestmentState] = useState(!edit?.investmentDistribution)
  const [unitsState, setUnitsState] = useState({
    overLimit: false,
    total: 0
  })

  useEffect(() => {
    if(edit) {
      if (hasRegion) {
        edit.region = submission.region
      }
      form.setFieldsValue(edit)
      setUnitsState({ overLimit: false, total: edit.totalUnits })
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
    if (investmentState || unitsState.overLimit){
      return
    }

    try {
      let values = await form.getFieldsValue()

      if(typeof edit?.index !== "undefined") {
        values.index = edit.index
        values = merge(edit, values)
      }
      values.unitCost = Number(values.unitCost)
      values.totalUnits = Number(values.totalUnits)

      if (
        [
          "HUMAN_RESOURCE",
          "ADVERTISEMENT_HUMAN_RESOURCE",
          "ADMINISTRATIVE_HUMAN_RESOURCE",
        ].includes(values.type) && !edit) {
        values.humanResource = [{ position: values.name }]
      }

      onSave(values)
      form.resetFields()
      setState({})
    }
    catch(e) {
      console.error(e)
    }
  }

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
    setState({})
  }

  const onFormChange = () => {
    const values = form.getFieldsValue()
    if (values.totalUnits !== unitsState.total){
      setUnitsState({ overLimit: false, total: values.totalUnits })
    }
    setState(state => ({ ...state, ...values }))
  }

  const onTypeChange = value => {
    if (getSelectValue(value) === "HUMAN_RESOURCE"){
      form.setFieldsValue({ measurementUnit: "Mes" })
      setState(state => ({ isUnitDisabled: true, ...state }))
    } else if (getSelectValue(value) === "EQUIPMENT"){
      form.setFieldsValue({ measurementUnit: "Pieza" })
      setState(state => ({ isUnitDisabled: true, ...state }))
    } else {
      form.setFieldsValue({ measurementUnit: undefined })
      setState(state => ({ isUnitDisabled: false, ...state }))
    }
  }

  return (
    <Modal
      title={`${edit ? "Editar" : "Agregar"} concepto`}
      onOk={onOk}
      onCancel={onCancelModal}
      okButtonProps={{ disabled: readOnly }}
      width={800}
      okText={`${edit ? "Guardar" : "Agregar"}`}
      cancelText={readOnly ? "Cerrar" : "Cancelar"}
      maskClosable={false}
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
                disabled={readOnly}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={hasRegion ? submission.region : ""}
              name="region"
              style={{display: "inline"}}
              label="Región"
              getValueFromEvent={getSelectValue}>
              <SelectField
                id="region"
                name="region"
                disabled={hasRegion || readOnly}
                options={implementer.submission.regions} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={edit?.type}
              name="type"
              style={{display: "inline"}}
              label="Tipo de gasto"
              getValueFromEvent={getSelectValue}>
              <SelectField
                id="type"
                name="type"
                disabled={readOnly}
                onChange={(value) => onTypeChange(value)}
                options={implementer.submission.conceptTypes} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={edit?.measurementUnit}
              name="measurementUnit"
              style={{display: "inline"}}
              label="Unidad de medida">
              <Input
                id="measurementUnit"
                disabled={state.isUnitDisabled || readOnly}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={edit?.unitCost}
              name="unitCost"
              style={{display: "inline"}}
              label="Costo unitario">
              <Input
                id="unitCost"
                disabled={readOnly}
                type="number"
                prefix="$" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={edit?.totalUnits}
              name="totalUnits"
              style={{display: "inline"}}
              label="Total de unidades">
              <Input
                id="totalUnits"
                disabled={readOnly}
                type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Row gutter={[10, 8]}>
              <Col span={24}>Costo total</Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input
                  disabled
                  prefix="$"
                  value={
                    numeral((state.unitCost * state.totalUnits) || 0)
                      .format("0,0.00")
                  }/>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Form.Item
              name="monthlyDistribution"
              style={{display: "inline"}}
              label={
                <FieldLabel>
                  Distribución mensual
                  <br />
                  <Typography.Text type="secondary">
                    Selecciona el número de unidades que utilizarás por mes. 20
                    unidades máximo por mes.
                  </Typography.Text>
                </FieldLabel>
              }>
              <MonthlyDistributionField
                value={edit?.monthlyDistribution}
                unitCost={state.unitCost}
                months={projectMonths}
                readOnly={readOnly}
                state={unitsState}
                setState={setUnitsState}/>
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
                allies={submission?.allies}
                value={edit?.investmentDistribution}
                unitCost={state.unitCost}
                totalUnits={state.totalUnits}
                readOnly={readOnly}
                state={investmentState}
                setState={setInvestmentState}/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
