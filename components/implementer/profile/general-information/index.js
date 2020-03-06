import { Card, Select, Form, Row, Col, Input } from "antd";
import { Section } from "../../../shared";

export function GeneralInformation() {
  return (
    <Section title="1. Información general">
      <Form
        name="general-information"
        layout="vertical">
        <Row gutter={[10, 8]} justify="start">
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Tipo de la implementadora">
              <Select>
                <Select.Option value="1">Test</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline", visibility: "hidden"}}
              label="Tipo de la implementadora">
              <Select>
                <Select.Option value="1">Test</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Nombre de la implementadora">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Director">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="RFC">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Nombre comercial">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Domicilio comercial">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Domicilio fiscal">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Teléfono">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Representante legal">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Correo electrónico">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Oficio de donataria">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Misión">
              <Input.TextArea autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Visión">
              <Input.TextArea autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Historia">
              <Input.TextArea autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Experiencia institucional">
              <Input.TextArea autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Apoyos anteriores">
              <Input.TextArea autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Alianzas">
              <Input.TextArea autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Ingresos / egresos">
              <Input.TextArea autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Section>
  )
}
