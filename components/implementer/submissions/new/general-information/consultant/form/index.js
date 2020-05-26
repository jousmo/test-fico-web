import { Col, Form, Input, Row, Empty } from "antd"
import { selectOptions, withForm } from "../../../../../../../helpers"
import {
  CompositeField,
  DateField,
  DeleteButton,
  FieldLabel,
  RadioField,
  UploadButton,
  Visibility
} from "../../../../../../shared"

function ConsultantForm({
  data,
  onChange,
  hasConsultant,
  hadConsultantReceivedSupports
}) {
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
              defaultValue={hasConsultant}
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
              label={
                <FieldLabel comentable={{
                  name: "commercialName",
                  section: "consultant"}}>
                  Nombre comercial
                </FieldLabel>
              }>
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
              label={
                <FieldLabel comentable={{
                  name: "commercialAddress",
                  section: "consultant"}}>
                  Dirección comercial
                </FieldLabel>
              }>
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
              label={
                <FieldLabel comentable={{
                  name: "contactName",
                  section: "consultant"}}>
                  Contacto responsable
                </FieldLabel>
              }>
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
              label={
                <FieldLabel comentable={{
                  name: "phone",
                  section: "consultant"}}>
                  Número de teléfono
                </FieldLabel>
              }>
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
              label={
                <FieldLabel comentable={{
                  name: "phone",
                  section: "consultant"}}>
                  RFC
                </FieldLabel>
              }>
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
              label={
                <FieldLabel comentable={{
                  name: "fiscalAddress",
                  section: "consultant"}}>
                  Dirección fiscal
                </FieldLabel>
              }>
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
                defaultValue={hadConsultantReceivedSupports}
                onChange={onChange}
                options={selectOptions.shared.yesNo} />
            </Form.Item>
          </Col>
          <Visibility visible={hadConsultantReceivedSupports}>
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
                        <>
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
                                <DeleteButton onClick={removeItem(index)} />
                              </Form.Item>
                            </Col>
                          </Row>
                        </>
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
        </Visibility>
      </Row>
    </Form>
  )
}

export default withForm(ConsultantForm)
