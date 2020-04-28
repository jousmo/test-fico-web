import { withForm } from "../../../../../../helpers/withForm"
import { Typography } from "antd"
import { DownloadButton } from "../../../../../shared"

function SubmissionAttachments({ data }) {
  return (
    <div>
      <Typography.Text>
        Al aprobar la solicitud y los documentos de la implementadora se podrá
        descargar los anexos de la solicitud.
      </Typography.Text>
      <br />
      <DownloadButton outlined style={{margin: "5px"}}>
        Descargar anexos
      </DownloadButton>
    </div>
  )
}

export default withForm(SubmissionAttachments)
