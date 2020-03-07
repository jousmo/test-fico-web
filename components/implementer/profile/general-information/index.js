import { Card, Select, Form, Row, Col, Input } from "antd";
import { Section } from "../../../shared";
import { useContext } from "react";
import { ImplementerProfileContext } from "../../../../contexts/implementer/profile";

export function GeneralInformation() {
  const { state, dispatch } = useContext(ImplementerProfileContext)

  const onChange = (value, event) => {
    console.log(value, event)
  }

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
              <Select onChange={onChange}>
                <Select.Option value="1">Test</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline", visibility: "hidden"}}
              label="Tipo de la implementadora">
              <Select onChange={onChange}>
                <Select.Option value="1">Test</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Nombre de la implementadora">
              <Input onChange={onChange} type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Director">
              <Input onChange={onChange} type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="RFC">
              <Input onChange={onChange} type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Nombre comercial">
              <Input onChange={onChange} type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Domicilio comercial">
              <Input onChange={onChange} type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Domicilio fiscal">
              <Input onChange={onChange} type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Teléfono">
              <Input onChange={onChange} type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Representante legal">
              <Input onChange={onChange} type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Correo electrónico">
              <Input onChange={onChange} type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Oficio de donataria">
              <Input onChange={onChange} type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Misión">
              <Input.TextArea onChange={onChange} autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Visión">
              <Input.TextArea onChange={onChange} autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Historia">
              <Input.TextArea onChange={onChange} autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Experiencia institucional">
              <Input.TextArea onChange={onChange} autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Apoyos anteriores">
              <Input.TextArea onChange={onChange} autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Alianzas">
              <Input.TextArea onChange={onChange} autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Ingresos / egresos">
              <Input.TextArea onChange={onChange} autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Section>
  )
}
