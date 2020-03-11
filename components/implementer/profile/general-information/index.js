import { Select, Form, Row, Col, Input, Button, Upload } from "antd";
import { Section, SelectField } from "../../../shared";
import { useContext } from "react";
import { ImplementerProfileContext } from "../../../../contexts/implementer/profile";
import { implementer } from "../../../../helpers/selectOptions";
import { UploadOutlined } from "@ant-design/icons";

export function GeneralInformation() {
  const {
    updateGeneralInformation,
    loading,
    error,
    data
  } = useContext(ImplementerProfileContext)

  const onChange = ({ currentTarget: { id, value } }) => {
    const newData = {}
    newData[id] = value

    updateGeneralInformation(newData)
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
              <SelectField
                id="type"
                name="type"
                onChange={onChange}
                defaultValue={data?.Implementer?.type}
                options={implementer.profile.implementerTypes} />
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
                name="name"
                defaultValue={data?.Implementer?.name}
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Director">
              <SelectField
                id="director"
                name="director"
                defaultValue={data?.Implementer?.director}
                options={implementer.profile.directorTypes}
                onChange={onChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="RFC">
              <Input
                id="rfc"
                name="rfc"
                defaultValue={data?.Implementer?.rfc}
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
                name="commercialName"
                defaultValue={data?.Implementer?.commercialName}
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
                name="commercialAddress"
                defaultValue={data?.Implementer?.commercialAddress}
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
                name="fiscalAddress"
                defaultValue={data?.Implementer?.fiscalAddress}
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
                name="phone"
                defaultValue={data?.Implementer?.phone}
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
                name="legalRepresentative"
                defaultValue={data?.Implementer?.legalRepresentative}
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
                name="email"
                defaultValue={data?.Implementer?.email}
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Oficio de donataria">
              <Upload>
                <Button>
                  <UploadOutlined /> Subir oficio
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Misión">
              <Input.TextArea
                id="mission"
                name="mission"
                defaultValue={data?.Implementer?.mission}
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
                name="vision"
                defaultValue={data?.Implementer?.vision}
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
                name="history"
                defaultValue={data?.Implementer?.history}
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
                name="institutionalExperience"
                defaultValue={data?.Implementer?.institutionalExperience}
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
                name="previousSupports"
                defaultValue={data?.Implementer?.previousSupports}
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
                name="alliances"
                defaultValue={data?.Implementer?.alliances}
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
                name="incomesAndExpenses"
                defaultValue={data?.Implementer?.incomesAndExpenses}
                onChange={onChange}
                autoSize={{minRows: 3}} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Section>
  )
}
