import {
  Select,
  Form,
  Row,
  Col,
  Input,
  Skeleton,
  Alert
} from "antd"
import { SelectField, UploadButtonForm, Visibility } from "../../../../shared"
import { implementer } from "../../../../../helpers/selectOptions"

export function GeneralInformationForm({
  data,
  isLoading,
  onChange,
  error,
  isGovernment,
  addDocument,
  removeDocument,
  disabled
}) {
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

  const onDoneFile = files => {
    addDocument(files[0], "DONATARY")
  }

  const onRemoveFile = () => {
    removeDocument("DONATARY")
  }

  const documents = []
  const donatary = data?.Implementer?.documents?.find(doc => (
    doc.type === "DONATARY"
  ))
  if (donatary){
    const { id, ...donataryDoc } = donatary
    documents.push({ uid: id, status: "done", ...donataryDoc })
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
              defaultValue={data?.Implementer?.type || "CIVIL_ORGANIZATION"}
              options={implementer.profile.implementerTypes}
              disabled={disabled}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline", visibility: "hidden"}}
            label="Tipo de la implementadora">
            <Select>
              <Select.Option
                value="1"
                disabled={disabled}>Test
              </Select.Option>
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
              onBlur={onChange}
              type="text"
              disabled={disabled}/>
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
              onBlur={onChange}
              type="text"
              disabled={disabled}/>
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
              onBlur={onChange}
              type="text"
              disabled={disabled}/>
          </Form.Item>
        </Col>
        <Visibility visible={!isGovernment}>
          <Col span={12}>
            <Form.Item
              style={{display: "inline"}}
              label="Nombre comercial">
              <Input
                id="commercialName"
                name="commercialName"
                defaultValue={data?.Implementer?.commercialName}
                onBlur={onChange}
                type="text"
                disabled={disabled}/>
            </Form.Item>
          </Col>
        </Visibility>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Domicilio comercial">
            <Input
              id="commercialAddress"
              name="commercialAddress"
              defaultValue={data?.Implementer?.commercialAddress}
              onBlur={onChange}
              type="text"
              disabled={disabled}/>
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
              onBlur={onChange}
              type="text"
              disabled={disabled}/>
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
              onBlur={onChange}
              type="tel"
              disabled={disabled}/>
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
              onBlur={onChange}
              type="text"
              disabled={disabled}/>
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
              onBlur={onChange}
              type="text"
              disabled={disabled}/>
          </Form.Item>
        </Col>
        <Visibility visible={!isGovernment}>
          <Col span={12}>
            <Form.Item
              label="Oficio de donataria">
              <UploadButtonForm
                fileList={documents}
                onRemoveFile={onRemoveFile}
                onChange={onDoneFile}
                maxFile={1}
                accept={"application/pdf"}
                disabled={disabled}>
                Subir oficio
              </UploadButtonForm>
            </Form.Item>
          </Col>
        </Visibility>
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label="Misión">
            <Input.TextArea
              id="mission"
              name="mission"
              defaultValue={data?.Implementer?.mission}
              onBlur={onChange}
              autoSize={{ minRows: 3 }}
              disabled={disabled}/>
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
              onBlur={onChange}
              autoSize={{ minRows: 3 }}
              disabled={disabled}/>
          </Form.Item>
        </Col>
        <Visibility visible={!isGovernment}>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Historia">
              <Input.TextArea
                id="history"
                name="history"
                defaultValue={data?.Implementer?.history}
                onBlur={onChange}
                autoSize={{ minRows: 3 }}
                disabled={disabled}/>
            </Form.Item>
          </Col>
        </Visibility>
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label="Experiencia institucional">
            <Input.TextArea
              id="institutionalExperience"
              name="institutionalExperience"
              defaultValue={data?.Implementer?.institutionalExperience}
              onBlur={onChange}
              autoSize={{ minRows: 3 }}
              disabled={disabled}/>
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
              onBlur={onChange}
              autoSize={{ minRows: 3 }}
              disabled={disabled}/>
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
              onBlur={onChange}
              autoSize={{ minRows: 3 }}
              disabled={disabled}/>
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
              onBlur={onChange}
              autoSize={{ minRows: 3 }}
              disabled={disabled}/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label="Objeto social">
            <Input.TextArea
              id="socialObject"
              name="socialObject"
              defaultValue={data?.Implementer?.socialObject}
              onBlur={onChange}
              autoSize={{ minRows: 3}}
              disabled={disabled}/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
