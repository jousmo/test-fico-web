import { Col, Form, Input, Radio, Row, Empty } from "antd"
import { selectOptions, withForm } from "../../../../../../helpers"
import {
  UploadButton,
  DateField,
  CompositeField,
  DeleteButton,
  RadioField,
  Visibility
} from "../../../../../shared"

function ConsultantForm({data, onChange, hasConsultant}) {
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

  const onAddSupport = (addNew) => {
    addNew({
      name: "",
      date: undefined,
      ammount: undefined
    })
  }

  return (
    <Form
      name="project-details"
      layout="vertical">
      <Row gutter={[10, 8]} justify="start">
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label="El proyecto cuenta con consultor">
            <RadioField
              id="hasConsultant"
              name="hasConsultant"
              defaultValue={data?.Submission?.hasConsultant}
              onChange={onChange}
              options={selectOptions.shared.yesNo} />
          </Form.Item>
        </Col>
        <Visibility visible={hasConsultant}>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Describe el perfil del consultor">
              <Input.TextArea
                id="description"
                name="description"
                defaultValue={data?.Submission?.consultant?.description}
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
                defaultValue={data?.Submission?.consultant?.commercialName}
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
                defaultValue={data?.Submission?.consultant?.commercialAddress}
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
                defaultValue={data?.Submission?.consultant?.contactName}
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
                defaultValue={data?.Submission?.consultant?.phone}
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
                defaultValue={data?.Submission?.consultant?.rfc}
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
                defaultValue={data?.Submission?.consultant?.fiscalAddress}
                onChange={onChange}
                type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Tipo de persona">
              <RadioField
                id="fiscalPersonType"
                name="fiscalPersonType"
                defaultValue={data?.Submission?.consultant?.fiscalPersonType}
                onChange={onChange}
                options={fiscalPersonTypes} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Documentos"
              help="Adjunta acta constitutiva, cotización firmada y CV.">
              <UploadButton style={{marginBottom: "12px"}}>
                Adjuntar
              </UploadButton>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="¿Ha recibido apoyos de FICOSEC">
              <RadioField
                id="hadReceivedSupports"
                name="hadReceivedSupports"
                defaultValue={data?.Submission?.consultant?.hadReceivedSupports}
                onChange={onChange}
                options={selectOptions.shared.yesNo} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Agrega los apoyos que has recibido por parte de FICOSEC">
              <CompositeField
                onChange={onSupportsChange}
                defaultValue={data?.Submission?.consultant?.supports}
                onClickAdd={onAddSupport}
                addLabel="Agregar apoyo">
                {({ items, updateItem, removeItem }) => 
                  <div>
                    { items.map((item, index) => 
                      <Form layout="vertical">
                        <Row gutter={[10, 8]} justify="start">
                          <Col span={8}>
                            <Form.Item
                              style={{display: "inline"}}
                              label="Nombre del proyecto">
                              <Input
                                id="name"
                                name="name"
                                defaultValue={item.name}
                                onChange={updateItem(index)}
                                type="text" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              style={{display: "inline"}}
                              label="Fecha">
                              <DateField
                                id="date"
                                name="date"
                                defaultValue={item.date}
                                onChange={updateItem(index)}
                                fullWidth />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              style={{display: "inline"}}
                              label="Monto recibido">
                              <Input
                                style={{width: "auto"}}
                                addonBefore="$"
                                id="amount"
                                name="amount"
                                onChange={updateItem(index)}
                                defaultValue={item.amount} />
                              <DeleteButton onClick={() => removeItem(index)} />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    ) }
                    { !items.length ?
                      <Empty
                        style={{marginBottom: "10px"}}
                        description="Agrega apoyos haciendo click
                        en el botón de abajo" />
                    : null }
                  </div>
                }
              </CompositeField>
            </Form.Item>
          </Col>
        </Visibility>
      </Row>
    </Form>
  )
}

export default withForm(ConsultantForm)
