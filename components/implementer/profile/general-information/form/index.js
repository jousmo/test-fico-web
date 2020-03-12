import {
  Select,
  Form,
  Row,
  Col,
  Input,
  Button,
  Upload,
  Skeleton,
  Alert
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { SelectField, UploadButton } from "../../../../shared";
import { implementer } from "../../../../../helpers/selectOptions";

export function GeneralInformationForm({data, isLoading, onChange, error}) {
  if(isLoading) {
    return <Skeleton active />
  }

  if(!data || error) {
    return (
      <Alert
        message="Error"
        description="Ha ocurrido un error al cargar los datos de esta sección,
        por favor actualiza la página."
        type="error"
        showIcon />
    )
  }

  return (
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
            <Input
              id="director"
              name="director"
              defaultValue={data?.Implementer?.director}
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
              type="tel" />
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
            <UploadButton>Subir oficio</UploadButton>
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
  )
}
