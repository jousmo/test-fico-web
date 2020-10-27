import { Popover, Space } from "antd"
import { DownloadButton } from "../../../../../shared"
import { withForm } from "../../../../../../helpers/withForm"
import { generalInformationExport } from "./helpers"

function ProjectAttachments({ data }) {
  const attachments = (
    <Space direction="vertical">
      <a onClick={() => generalInformationExport(data)}>Información general</a>
    </Space>
  )

  return (
    <div>
      <Popover
        content={attachments}
        title="Proyecto"
        trigger="click">
        <DownloadButton outlined style={{margin: "5px"}}>
          Descargar documentos
        </DownloadButton>
      </Popover>
    </div>
  )
}

export default withForm(ProjectAttachments)
