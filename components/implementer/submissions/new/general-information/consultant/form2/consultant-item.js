import { Card, Descriptions } from "antd"
import { DeleteButton, EditButton } from "../../../../../../shared"
import { selectOptions } from "../../../../../../../helpers"

export function ConsultantItem({ data, onEdit, onDelete, index }) {
  const {
    description,
    commercialName,
    commercialAddress,
    contactName,
    phone,
    rfc,
    fiscalAddress,
    fiscalPersonType,
    hadReceivedSupports,
  } = data

  const {
    getReadableValue,
    implementer: { submission },
    shared: { yesNo }
  } = selectOptions

  const readablePersonType =
    getReadableValue(submission.fiscalPersonTypes, fiscalPersonType)

  const hasSupports = getReadableValue(yesNo, hadReceivedSupports)

  return (
    <Card key={`beneficiary_${index}`} style={{marginBottom: "20px"}}>
      <Descriptions>
        <Descriptions.Item label="Descripción">
          {description}
        </Descriptions.Item>
        <Descriptions.Item label="Nombre comercial">
          {commercialName}
        </Descriptions.Item>
        <Descriptions.Item label="Dirección comercial">
          {commercialAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Contacto responsable">
          {contactName}
        </Descriptions.Item>
        <Descriptions.Item label="Número de teléfono">
          {phone}
        </Descriptions.Item>
        <Descriptions.Item label="RFC">
          {rfc}
        </Descriptions.Item>
        <Descriptions.Item label="Dirección fiscal">
          {fiscalAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Tipo de persona">
          {readablePersonType}
        </Descriptions.Item>
        <Descriptions.Item label="Apoyos">
          {hasSupports}
        </Descriptions.Item>
      </Descriptions>
      <DeleteButton onClick={onDelete} style={{marginLeft: "8px"}} />
      <EditButton onClick={onEdit} />
    </Card>
  )
}
