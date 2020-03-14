import { Modal, Form, Row, Col, Input } from "antd";
import { YearSelect, SelectField } from "../../../../shared";
import { implementer } from "../../../../../helpers/selectOptions";

export function ProjectModal({onSave, onCancel, ...props}) {
  const onChange = () => {};

  return (
    <Modal title="Agregar proyecto" {...props}>
      <Form
        name="general-information"
        layout="vertical">
        <Row gutter={[10, 8]} justify="start">
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Institución financiadora">
              <Input
                id="financingInstitution"
                name="financingInstitution"
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Monto">
              <Input
                id="amount"
                name="amount"
                addonBefore="$"
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="% de financiamiento">
              <Input
                id="financingPercent"
                name="financingPercent"
                addonAfter="%"
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Nombre del proyecto">
              <Input
                id="name"
                name="name"
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Año del proyecto">
              <YearSelect
                id="year"
                name="year"
                onChange={onChange}
                displayNumber={50} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Tipo de presupuesto">
              <SelectField
                id="budgetType"
                name="budgetType"
                onChange={onChange}
                options={implementer.profile.budgetTypes} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Objetivo general del proyecto">
              <Input
                id="objective"
                name="objective"
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
