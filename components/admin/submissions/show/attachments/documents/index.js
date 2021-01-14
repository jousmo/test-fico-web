import { withForm } from "../../../../../../helpers/withForm"
import { Typography, Popover, Space } from "antd"
import { DownloadButton } from "../../../../../shared"
import { useRouter } from "next/router"
import Link from "next/link"
import { submissionStatusOptions } from "../../../../../../helpers/selectOptions/shared/submission-status"

function SubmissionAttachments({ data }) {
  const router = useRouter()
  const url = `/admin/submissions/${router.query.id}/pdf`
  const statusIndex = submissionStatusOptions?.findIndex(e => e.value === data?.status)

  const attachments = (
    <Space direction="vertical">
      <Link href={`${url}/general-information`}>
        <a target="_blank">Información general</a>
      </Link>
      <Link href={`${url}/technical-specification`}>
        <a target="_blank">Especificación técnica</a>
      </Link>
      <Link href={`${url}/budget`}>
        <a target="_blank">Presupuesto</a>
      </Link>
      <Link href={`${url}/schedule`}>
        <a target="_blank">Cronograma</a>
      </Link>
      <Link href={`${url}/reports`}>
        <a target="_blank">Reportes</a>
      </Link>
      <Link href={`${url}/ministrations`}>
        <a target="_blank">Ministraciones</a>
      </Link>
    </Space>
  )

  return (
    <div>
      <Typography.Text>
        Al aprobar la solicitud y los documentos de la implementadora se podrá
        descargar los anexos de la solicitud.
      </Typography.Text>
      <br />
      <Popover
        content={statusIndex > 10 && attachments}
        title="Anexos"
        trigger="click">
        <DownloadButton outlined style={{margin: "5px"}}>
          Descargar anexos
        </DownloadButton>
      </Popover>
    </div>
  )
}

export default withForm(SubmissionAttachments)
