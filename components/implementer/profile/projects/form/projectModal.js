import { Modal, Form, Row, Col, Input } from "antd";
import { YearSelect, SelectField } from "../../../../shared";
import { implementer } from "../../../../../helpers/selectOptions";
import { useForm } from "antd/lib/form/util";
import { getSelectValue } from "../../../../../helpers/getSelectValue";

export function ProjectModal({onCancel, onSave, ...props}) {
  const [form] = useForm()
  
  const onOk = async () => {
    try {
      const values = await form.getFieldsValue()
      onSave(values)
      form.resetFields()
    }
    catch(e) {

    }
  }

  return (
    <Modal
      title="Agregar proyecto"
      onOk={onOk}
      onCancel={onCancel}
      {...props}>
      <Form
        form={form}
        name="general-information"
        layout="vertical">
        <Row gutter={[10, 8]} justify="start">
          <Col span={24}>
            <Form.Item
              name="financingInstitution"
              style={{display: "inline"}}
              label="Institución financiadora">
              <Input
                id="financingInstitution"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="amount"
              style={{display: "inline"}}
              label="Monto">
              <Input
                id="amount"
                addonBefore="$"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="financingPercentage"
              style={{display: "inline"}}
              label="% de financiamiento">
              <Input
                id="financingPercentage"
                addonAfter="%"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="name"
              style={{display: "inline"}}
              label="Nombre del proyecto">
              <Input
                id="name"
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="year"
              style={{display: "inline"}}
              label="Año del proyecto"
              getValueFromEvent={getSelectValue}>
              <YearSelect
                id="year"
                displayNumber={50} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="budgetType"
              style={{display: "inline"}}
              label="Tipo de presupuesto"
              getValueFromEvent={getSelectValue}>
              <SelectField
                id="budgetType"
                options={implementer.profile.budgetTypes} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="objective"
              style={{display: "inline"}}
              label="Objetivo general del proyecto">
              <Input
                id="objective"
                type="text" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
