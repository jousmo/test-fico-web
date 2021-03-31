import { Popover, Space } from "antd"
import { DownloadButton } from "../../../../../shared"
import { withForm } from "../../../../../../helpers/withForm"
import {
  generalInformationExport,
  technicalSpecificationExport,
  budgetExport,
  scheduleExport,
  humanResourcesExport,
  financialMonitoringExport
} from "./helpers"

function ProjectAttachments({ data }) {
  const attachments = (
    <Space direction="vertical">
      <a onClick={() => generalInformationExport(data)}>Información general</a>
      <a onClick={() => technicalSpecificationExport(data)}>Ficha Técnica</a>
      <a onClick={() => budgetExport(data)}>Presupuesto</a>
      <a onClick={() => scheduleExport(data)}>Cronograma</a>
      <a onClick={() => humanResourcesExport(data)}>Recursos humanos</a>
      <a onClick={() => financialMonitoringExport(data)}>Monitoreo financiero</a>
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
