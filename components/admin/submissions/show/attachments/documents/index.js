import { withForm } from "../../../../../../helpers/withForm"
import { Typography, Popover } from "antd"
import { DownloadButton } from "../../../../../shared"
import { submissionStatusOptions } from "../../../../../../helpers/selectOptions/shared/submission-status"
import { AttachmentsPDFContent } from "./pdf-content"
import { AttachmentsXLSContent } from "./xls-content"

function SubmissionAttachments({ data }) {
  const statusIndex = submissionStatusOptions?.findIndex(e => e.value === data?.status)

  return (
    <div>
      <Typography.Text>
        Al aprobar la solicitud y los documentos de la implementadora se podrá
        descargar los anexos de la solicitud.
      </Typography.Text>
      <br />
      <Popover
        content={statusIndex > 0 && <AttachmentsPDFContent />}
        title="Anexos PDF"
        trigger="click">
        <DownloadButton outlined style={{ margin: "5px" }}>
          Descargar anexos PDF
        </DownloadButton>
      </Popover>
      <Popover
        content={statusIndex > 0 && <AttachmentsXLSContent />}
        title="Anexos XLS"
        trigger="click">
        <DownloadButton outlined style={{ margin: "5px" }}>
          Descargar anexos XLS
        </DownloadButton>
      </Popover>
    </div>
  )
}

export default withForm(SubmissionAttachments)
