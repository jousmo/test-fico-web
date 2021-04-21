import { Space } from "antd"
import { useRouter } from "next/router"
import Link from "next/link"

export function AttachmentsPDFContent() {
  const router = useRouter()
  const url = `/admin/submissions/${router.query.id}/pdf`

  return (
    <Space direction="vertical">
      <Link href={`${url}/general-information`}>
        <a target="_blank">Información general</a>
      </Link>
      <Link href={`${url}/technical-specification`}>
        <a target="_blank">Ficha técnica</a>
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
}
