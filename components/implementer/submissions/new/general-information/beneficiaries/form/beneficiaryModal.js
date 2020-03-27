import { Modal, Form, Row, Col, Input } from "antd"
import { useForm } from "antd/lib/form/util"
import { SelectField } from "../../../../../../shared"
import {
  preventionLevelTypes,
  ageRanges,
  genderTypes,
  educationLevelTypes
} from "../../../../../../../helpers/selectOptions/implementer/submission"
import { getSelectValue } from "../../../../../../../helpers/getSelectValue"

export function BeneficiaryModal({onCancel, onSave, ...props}) {
  const [form] = useForm()

  const onOk = async () => {
    try {
      const values = await form.getFieldsValue()

      onSave(values)
      form.resetFields()
    }
    catch(e) {
      console.error(e)
    }
  }

  return (
    <Modal
      title="Agregar beneficiario"
      onOk={onOk}
      onCancel={onCancel}
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
                options={ageRanges} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="preventionLevel"
              style={{display: "inline"}}
              label="Nivel de prevención"
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
