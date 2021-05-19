import { withForm } from "../../../../../../helpers/withForm"
import { Typography, Popover } from "antd"
import { DownloadButton, Visibility } from "../../../../../shared"
import { submissionStatusOptions } from "../../../../../../helpers/selectOptions/shared/submission-status"
import { AttachmentsPDFContent } from "./pdf-content"
import { AttachmentsXLSContent } from "./xls-content"
import { ExtraAttachmentsContent } from "./extra-attachments"

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
      <Visibility visible={statusIndex > 10}>
        <Popover
          content={<ExtraAttachmentsContent />}
          title="Anexos 3 y 4"
          trigger="click">
          <DownloadButton outlined style={{ margin: "5px" }}>
            Anexos 3 y 4
          </DownloadButton>
        </Popover>
      </Visibility>
    </div>
  )
}

export default withForm(SubmissionAttachments)
