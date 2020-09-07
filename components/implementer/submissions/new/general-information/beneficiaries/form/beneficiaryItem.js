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

export function BeneficiaryItem({ data, onEdit, onDelete, index, readOnly, hiddenComments }) {
  const { description, number } = data

  const educationLevel = getReadableValue(
    educationLevelTypes,
    data.educationLevel
  )

  const gender = getReadableValue(
    genderTypes,
    data.gender
  )

  const ages = data.age?.map(age => (
    getReadableValue(
      ageRanges,
      age
    )
  ))?.join(", ")

  const preventionLevel = getReadableValue(
    preventionLevelTypes,
    data.preventionLevel
  )

  return (
    <Card key={`beneficiary_${index}`} style={{marginBottom: "20px"}}>
      <Typography.Title level={4}>
        {description}
        {!hiddenComments &&
          <CommentButton
            name={`beneficiary_${index}`}
            index={index}
            section="beneficiary" />
        }
      </Typography.Title>
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
      <Typography.Text>{ages}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Nivel de intervención: </Typography.Text>
      <Typography.Text>{preventionLevel}</Typography.Text>
      {!readOnly && (
        <>
          <DeleteButton onClick={onDelete} style={{marginLeft: "8px"}} />
          <EditButton onClick={onEdit} />
        </>
      )}
    </Card>
  )
}
