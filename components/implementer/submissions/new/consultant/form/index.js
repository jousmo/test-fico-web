import { withForm } from "../../../../../../../helpers"
import { Form, Row, Col, Input, Radio } from "antd"
import { CompositeField, DeleteButton } from "../../../../../../shared"
import { selectOptions } from "../../../../../../helpers"
import { FileInput } from "../../../../profile/legal-documents/form/fileInput"
import { UploadButton } from "../../../../../shared"

function ConsultantForm({data, onChange}) {
  const onSupportsChange = (newSupports) => {
    onChange && onChange({
      currentTarget: {
        id: "supports",
        value: newSupports
      }
    })
  }

  const fiscalPersonTypes = selectOptions.implementer.submission
    .fiscalPersonTypes

  return (
    <Form
      name="project-details"
      layout="vertical">
      <Row gutter={[10, 8]} justify="start">
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label="El proyecto cuenta con consultor">
            <Radio.Group
              id="hasConsultant"
              name="hasConsultant"
              defaultValue={data?.Submission?.hasConsultant}
              onChange={onChange}
              options={selec} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label="Describe el perfil del consultor">
            <Input.TextArea
              id="description"
              name="description"
              defaultValue={data?.Submission?.consultor?.description}
              onChange={onChange}
              autoSize={{minRows: 3}} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Nombre comercial">
            <Input
              id="commercialName"
              name="commercialName"
              defaultValue={data?.Submission?.consultor?.commercialName}
              onChange={onChange}
              type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Dirección comercial">
            <Input
              id="commercialAddress"
              name="commercialAddress"
              defaultValue={data?.Submission?.consultor?.commercialAddress}
              onChange={onChange}
              type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Contacto responsable">
            <Input
              id="contactName"
              name="contactName"
              defaultValue={data?.Submission?.consultor?.contactName}
              onChange={onChange}
              type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Número de teléfono">
            <Input
              id="phone"
              name="phone"
              defaultValue={data?.Submission?.consultor?.phone}
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
              defaultValue={data?.Submission?.consultor?.contactName}
              onChange={onChange}
              type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Dirección fiscal">
            <Input
              id="fiscalAddress"
              name="fiscalAddress"
              defaultValue={data?.Submission?.consultor?.fiscalAddress}
              onChange={onChange}
              type="text" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label="Tipo de persona">
            <Radio.Group
              id="fiscalPersonType"
              name="fiscalPersonType"
              defaultValue={data?.Submission?.consultor?.fiscalPersonType}
              onChange={onChange}
              options={fiscalPersonTypes} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label="Documentos"
            help="Adjunta acta constitutiva, cotización firmada y CV.">
            <UploadButton>Adjuntar</UploadButton>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label="¿Ha recibido apoyos de FICOSEC">
            <Radio.Group
              id="fiscalPersonType"
              name="fiscalPersonType"
              defaultValue={data?.Submission?.consultor?.hadReceivedSupports}
              onChange={onChange}
              options={selectOptions.shared.yesNo} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default withForm(DevelopmentObjectivesForm)
