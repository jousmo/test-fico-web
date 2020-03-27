import { Card, Typography } from "antd"
import { getReadableValue } from "../../../../../../../helpers/selectOptions"
import {
  genderTypes,
  educationLevelTypes,
  ageRanges,
  preventionLevelTypes
} from "../../../../../../../helpers/selectOptions/implementer/submission/"
import { DeleteButton } from "../../../../../../shared"

export function BeneficiaryItem({ data, onDelete, key }) {
  const { description, number } = data

  const educationLevel = getReadableValue(
    educationLevelTypes,
    data.educationLevel
  )

  const gender = getReadableValue(
    genderTypes,
    data.gender
  )

  const age = getReadableValue(
    ageRanges,
    data.age
  )

  const preventionLevel = getReadableValue(
    preventionLevelTypes,
    data.preventionLevel
  )

  return (
    <Card key={`beneficiary_${key}`} style={{marginBottom: "20px"}}>
      <Typography.Title level={4}>{description}</Typography.Title>
      <Typography.Text type="secondary">
        {number} beneficiarios
      </Typography.Text>
      <br />
      <Typography.Text strong>Nivel Educativo: </Typography.Text>
      <Typography.Text>
        {`${educationLevel} - ${gender}`}
      </Typography.Text>
      <br />
      <Typography.Text strong>Edad: </Typography.Text>
      <Typography.Text>{age}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Nivel de prevención: </Typography.Text>
      <Typography.Text>{preventionLevel}</Typography.Text>
      <DeleteButton onClick={onDelete} />
    </Card>
  )
}
