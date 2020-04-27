import { withForm } from "../../../../../../helpers/withForm"
import { Typography } from "antd"
import { UploadButton } from "../../../../../shared"

function SubmissionAgreement({ data }) {
  const signedAgreement = null

  return (
    <div>
      <Typography.Text>
        Anexa el convenio firmado
      </Typography.Text>
      <br />
      <UploadButton style={{margin: "5px"}}>
        Subir convenio firmado
      </UploadButton>
    </div>
  )
}

export default withForm(SubmissionAgreement)
