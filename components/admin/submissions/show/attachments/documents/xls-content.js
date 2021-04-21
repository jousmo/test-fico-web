import { Space } from "antd"
import { submission } from "../../../../../../graphql"
import { useLazyQuery } from "@apollo/react-hooks"
import { useContext, useEffect } from "react"
import { AdminSubmissionContext } from "../../../../../../contexts/admin/submissions/show"
import { useRouter } from "next/router"
import {
  scheduleExport,
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

  const [getSchedule, { data: schedule = {} }] = useLazyQuery(submission.queries.getTechnicalSpecification,  {
    client, variables: { id }
  })

  useEffect(async () => {
    if (generalInfo.GeneralInformation) {
      await generalInformationExport(generalInfo.GeneralInformation)
    }
  }, [generalInfo])

  useEffect(async () => {
    if (schedule.TechnicalSpecification) {
      await scheduleExport(schedule.TechnicalSpecification)
    }
  }, [schedule])

  return (
    <Space direction="vertical">
      <a onClick={() => getGeneralInfo()}>Información general</a>
      {/*<a onClick={() => {}}>Ficha técnica</a>*/}
      {/*<a onClick={() => {}}>Presupuesto</a>*/}
      <a onClick={() => getSchedule()}>Cronograma</a>
      {/*<a onClick={() => {}}>Reportes</a>*/}
      {/*<a onClick={() => {}}>Ministraciones</a>*/}
    </Space>
  )
}
