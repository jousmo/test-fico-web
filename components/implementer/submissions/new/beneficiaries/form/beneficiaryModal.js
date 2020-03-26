import { Modal, Form, Row, Col, Input, InputNumber } from "antd"
import { useForm } from "antd/lib/form/util"
import { YearSelect, SelectField } from "../../../../../shared"
import { preventionLevelTypes } from "../../../../../../helpers/selectOptions/implementer/submission"

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
              label="Caracteristicas del beneficiario">
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
              <InputNumber
                id="amount"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gender"
              style={{display: "inline"}}
              label="Sexo">
              <Input
                id="gender"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="educationLevel"
              style={{display: "inline"}}
              label="Nivel educativo">
              <Input
                id="educationLevel"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="age"
              style={{display: "inline"}}
              label="Edad">
              <InputNumber
                id="age"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="preventionLevel"
              style={{display: "inline"}}
              label="Nivel de prevención">
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
