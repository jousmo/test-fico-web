import { Modal, Form, Row, Col, Input } from "antd"
import { useEffect } from "react"
import { SelectField } from "../../../../../../shared"
import {
  preventionLevelTypes,
  ageRanges,
  genderTypes,
  educationLevelTypes
} from "../../../../../../../helpers/selectOptions/implementer/submission"
import { getSelectValue } from "../../../../../../../helpers/getSelectValue"
import { merge } from "lodash"

export function BeneficiaryModal({ edit, onCancel, onSave, review, ...props }) {
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
        values.index = edit.index
        edit.age = null
        edit.educationLevel = null
        edit.gender = null
        values = merge(edit, values)
      }
      values.number = Number(values.number)

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
      title={`${edit ? "Editar" : "Agregar"} beneficiario`}
      onOk={onOk}
      onCancel={onCancelModal}
      okText={`${edit ? "Guardar" : "Agregar"}`}
      okButtonProps={{ disabled: review }}
      cancelText={review ? "Cerrar" : "Cancelar"}
      maskClosable={false}
      {...props}>
      <Form
        form={form}
        name="beneficiary-form"
        layout="vertical">
        <Row gutter={[10, 8]} justify="start">
          <Col span={24}>
            <Form.Item
              name="description"
              style={{display: "inline"}}
              label="Características del beneficiario">
              <Input
                id="description"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="number"
              style={{display: "inline"}}
              label="Número de beneficiarios">
              <Input
                id="number"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gender"
              style={{display: "inline"}}
              label="Sexo"
              getValueFromEvent={getSelectValue}>
              <SelectField
                id="gender"
                mode="tags"
                options={genderTypes} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="educationLevel"
              style={{display: "inline"}}
              label="Nivel educativo"
              getValueFromEvent={getSelectValue}>
              <SelectField
                id="educationLevel"
                mode="tags"
                options={educationLevelTypes} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="age"
              style={{display: "inline"}}
              label="Edad"
              getValueFromEvent={getSelectValue}>
              <SelectField
                id="age"
                mode="tags"
                options={ageRanges} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="preventionLevel"
              style={{display: "inline"}}
              label="Nivel de Prevención / Intervención"
              getValueFromEvent={getSelectValue}>
              <SelectField
                id="preventionLevel"
                options={preventionLevelTypes} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
