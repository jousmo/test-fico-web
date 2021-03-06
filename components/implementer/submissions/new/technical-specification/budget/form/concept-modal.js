import { Modal, Form, Row, Col, Input, Select, Typography } from "antd"
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
  const township = submission?.township?.join(" ")
  const hasRegion = !township?.includes("Zona centro sur" || "Estatal")
  const humanResources = [
    "HUMAN_RESOURCE",
    "ADVERTISEMENT_HUMAN_RESOURCE",
    "ADMINISTRATIVE_HUMAN_RESOURCE",
  ]

  const [form] = Form.useForm()
  const [unit, setUnit] = useState({
    isEquipment: false,
    isHumanResource: false
  })
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
      setUnit({
        isEquipment: edit.type === "EQUIPMENT",
        isHumanResource: humanResources.includes(edit.type)
      })
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
      await form.validateFields()
      let values = await form.getFieldsValue()

      if(typeof edit?.index !== "undefined") {
        values.index = edit.index
        values = merge(edit, values)
      }
      values.unitCost = Number(values.unitCost)
      values.totalUnits = Number(values.totalUnits)

      if (humanResources.includes(values.type)) {
        if (edit) {
          values.humanResource[0].position = values.name
        } else {
          values.humanResource = [{ position: values.name }]
        }
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
    setUnit({ isHumanResource: false, isEquipment: false })
  }

  const onFormChange = () => {
    const values = form.getFieldsValue()
    if (values.totalUnits !== unitsState.total){
      setUnitsState({ overLimit: false, total: values.totalUnits })
    }
    setState(state => ({ ...state, ...values }))
  }

  const onTypeChange = value => {
    if (humanResources.includes(getSelectValue(value))){
      form.setFieldsValue({ measurementUnit: "Mes" })
      setUnit({ isHumanResource: true, isEquipment: false })
    } else if (getSelectValue(value) === "EQUIPMENT"){
      form.setFieldsValue({ measurementUnit: "Pieza" })
      setUnit({ isHumanResource: false, isEquipment: true })
    } else {
      form.setFieldsValue({ measurementUnit: "" })
      setUnit({ isHumanResource: false, isEquipment: false })
    }
  }

  return (
    <Modal
      destroyOnClose
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
              label="Descripci??n">
              <Input
                id="name"
                disabled={readOnly}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="region"
              style={{display: "inline"}}
              label="Regi??n"
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
              getValueFromEvent={getSelectValue}
              rules={[{ required: true, message: "El campo es requerido" }]}>
              <SelectField
                id="type"
                name="type"
                disabled={readOnly}
                onChange={(value) => onTypeChange(value)}
                options={implementer.submission.conceptTypes} />
            </Form.Item>
          </Col>
          {!!unit.isHumanResource && (
            <Col span={12}>
              <Form.Item
                initialValue={edit?.measurementUnit}
                name="measurementUnit"
                style={{display: "inline"}}
                label="Unidad de medida"
                rules={[{ required: true, message: "El campo es requerido" }]}>
                <Select id="measurementUnit" disabled={readOnly}>
                  <Select.Option value="Mes">Mes</Select.Option>
                  <Select.Option value="Horas">Horas</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          )}
          {!unit.isHumanResource && (
            <Col span={12}>
              <Form.Item
                initialValue={edit?.measurementUnit}
                name="measurementUnit"
                style={{display: "inline"}}
                label="Unidad de medida"
                rules={[{ required: true, message: "El campo es requerido" }]}>
                <Input
                  id="measurementUnit"
                  disabled={unit.isEquipment || readOnly}
                  type="text" />
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item
              initialValue={edit?.unitCost}
              name="unitCost"
              style={{display: "inline"}}
              label="Costo unitario"
              rules={[{ required: true, message: "El campo es requerido" }]}>
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
              label="Total de unidades"
              rules={[{ required: true, message: "El campo es requerido" }]}>
              <Input
                id="totalUnits"
                disabled={readOnly}
                type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Costo total">
              <Input
                disabled
                prefix="$"
                value={
                  numeral((state.unitCost * state.totalUnits) || 0)
                    .format("0,0.00")
                }/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="monthlyDistribution"
              style={{display: "inline"}}
              label={
                <FieldLabel>
                  Distribuci??n mensual
                  <br />
                  <Typography.Text type="secondary">
                    Selecciona el n??mero de unidades que utilizar??s por mes. 20
                    unidades m??ximo por mes.
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
                Distribuci??n de la inversi??n
                <br />
                <Typography.Text type="secondary">
                  Distribuye el monto de inversi??n de cada entidad involucrada.
                </Typography.Text>
              </FieldLabel>}>
              <InvestmentDistributionField
                allies={submission?.allies}
                dist={edit?.investmentDistribution}
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
