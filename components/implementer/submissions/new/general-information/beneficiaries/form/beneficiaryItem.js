import { Card, Typography } from "antd"
import { getReadableValue } from "../../../../../../../helpers/selectOptions"
import {
  genderTypes,
  educationLevelTypes,
  ageRanges,
  preventionLevelTypes
} from "../../../../../../../helpers/selectOptions/implementer/submission/"
import { DeleteButton, EditButton } from "../../../../../../shared"
import { CommentButton } from "../../../../../../admin/submissions/review"

export function BeneficiaryItem({ data, onEdit, onDelete, index, readOnly, hiddenComments, review }) {
  const { description, number } = data

  const educationLevels = data?.educationLevel?.map(educationLevel => (
    getReadableValue(
      educationLevelTypes,
      educationLevel
    )
  ))?.join(", ")

  const genders = data?.gender?.map(gender => (
    getReadableValue(
      genderTypes,
      gender
    )
  ))?.join(", ")

  const ages = data?.age?.map(age => (
    getReadableValue(
      ageRanges,
      age
    )
  ))?.join(", ")

  const preventionLevel = getReadableValue(
    preventionLevelTypes,
    data?.preventionLevel
  )

  return (
    <Card key={`beneficiary_${index}`} style={{marginBottom: "20px"}}>
      <Typography.Title level={4}>
        {description}
        {!hiddenComments &&
          <CommentButton
            name={`beneficiary_${index}`}
            index={index}
            section="BENEFICIARY" />
        }
      </Typography.Title>
      <Typography.Text type="secondary">
        {number} beneficiarios
      </Typography.Text>
      <br />
      <Typography.Text strong>Nivel Educativo: </Typography.Text>
      <Typography.Text>
        {`${educationLevels} - ${genders}`}
      </Typography.Text>
      <br />
      <Typography.Text strong>Edad: </Typography.Text>
      <Typography.Text>{ages}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Nivel de Prevención / Intervención: </Typography.Text>
      <Typography.Text>{preventionLevel}</Typography.Text>
      {!readOnly && (
        <>
          {!review && <DeleteButton onClick={onDelete} style={{marginLeft: "8px"}}/>}
          <EditButton onClick={onEdit} />
        </>
      )}
    </Card>
  )
}
