import { withForm } from "../../../../../../helpers/withForm"
import { Card, Typography } from "antd"
import {
  getReadableValue
} from "../../../../../../helpers/selectOptions/getReadableValue"
import {
  ageRanges,
  genderTypes,
  educationLevelTypes,
  preventionLevelTypes
} from "../../../../../../helpers/selectOptions/implementer/submission"

function Beneficiary({ data }){
  const {
    description,
    number,
    gender,
    educationLevel,
    age,
    preventionLevel
  } = data

  const readableEdLevel = educationLevel?.map(educationLevel => (
    getReadableValue(
      educationLevelTypes,
      educationLevel
    )
  ))?.join(", ")

  const readableGender = gender?.map(gender => (
    getReadableValue(
      genderTypes,
      gender
    )
  ))?.join(", ")

  const readableAge = age?.map(age => (
    getReadableValue(
      ageRanges,
      age
    )
  ))?.join(", ")

  const readablePrLevel = getReadableValue(
    preventionLevelTypes,
    preventionLevel
  )

  return (
    <Card style={{marginBottom: "10px", backgroundColor: "whitesmoke"}}>
      <Typography.Text strong>
        {description}
      </Typography.Text>
      <br />
      <Typography.Text type="secondary">
        {number} beneficiarios
      </Typography.Text>
      <br />
      <Typography.Text strong>Nivel Educativo: </Typography.Text>
      <Typography.Text>
        {`${readableEdLevel} - ${readableGender}`}
      </Typography.Text>
      <br />
      <Typography.Text strong>Edad: </Typography.Text>
      <Typography.Text>{readableAge}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Nivel de prevención: </Typography.Text>
      <Typography.Text>{readablePrLevel}</Typography.Text>
    </Card>
  )
}

export default withForm(Beneficiary)
