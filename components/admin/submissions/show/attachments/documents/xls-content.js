import { Space } from "antd"
import { submission } from "../../../../../../graphql"
import { useLazyQuery } from "@apollo/react-hooks"
import { useContext, useEffect } from "react"
import { AdminSubmissionContext } from "../../../../../../contexts/admin/submissions/show"
import { useRouter } from "next/router"
import {
  generalInformationExport
} from "../../../../projects/show/attachments/documents/helpers"

export function AttachmentsXLSContent() {
  const { client } = useContext(AdminSubmissionContext)
  const router = useRouter()
  const { query: { id } } = router || {}

  const [getGeneralInfo, { data: generalInfo = {} }] = useLazyQuery(submission.queries.getGeneralInfo, {
    client,
    variables: { id }
  })

  useEffect(async () => {
    if (generalInfo.GeneralInformation) {
      await generalInformationExport(generalInfo.GeneralInformation)
    }
  }, [generalInfo])

  return (
    <Space direction="vertical">
      <a onClick={() => getGeneralInfo()}>Información general</a>
      {/*<a onClick={() => {}}>Ficha técnica</a>*/}
      {/*<a onClick={() => {}}>Presupuesto</a>*/}
      {/*<a onClick={() => {}}>Cronograma</a>*/}
      {/*<a onClick={() => {}}>Reportes</a>*/}
      {/*<a onClick={() => {}}>Ministraciones</a>*/}
    </Space>
  )
}
