import { Card, Select, Form, Row, Col, Input } from "antd";
import { Section } from "../../../shared";
import { useContext } from "react";
import { ImplementerProfileContext } from "../../../../contexts/implementer/profile";

export function GeneralInformation() {
  const { updateGeneralInformation } = useContext(ImplementerProfileContext)

  const onChange = ({ currentTarget: { id, value } }) => {
    const newData = {}
    newData[id] = value

    updateGeneralInformation(newData)
  }

  const onSelectChange = name => value => {
    onChange({currentTarget: { id: name, value: value }})
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
              <Select id="type" onChange={onSelectChange("type")}>
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
              <Input
                id="name"
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Director">
              <Input
                id="director"
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="RFC">
              <Input
                id="rfc"
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Nombre comercial">
              <Input
                id="commercialName"
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Domicilio comercial">
              <Input
                id="commercialAddress"
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Domicilio fiscal">
              <Input
                id="fiscalAddress"
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Teléfono">
              <Input
                id="phone"
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Representante legal">
              <Input
                id="legalRepresentative"
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Correo electrónico">
              <Input
                id="email"
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Oficio de donataria">
              <Input
                id="proofOfCharitableContributions"
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Misión">
              <Input.TextArea
                id="mission"
                onChange={onChange}
                autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Visión">
              <Input.TextArea
                id="vision"
                onChange={onChange}
                autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Historia">
              <Input.TextArea
                id="history"
                onChange={onChange}
                autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Experiencia institucional">
              <Input.TextArea
                id="institutionalExperience"
                onChange={onChange}
                autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Apoyos anteriores">
              <Input.TextArea
                id="previousSupports"
                onChange={onChange}
                autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Alianzas">
              <Input.TextArea
                id="alliances"
                onChange={onChange}
                autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Ingresos / egresos">
              <Input.TextArea
                id="incomesAndExpenses"
                onChange={onChange}
                autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Section>
  )
}
