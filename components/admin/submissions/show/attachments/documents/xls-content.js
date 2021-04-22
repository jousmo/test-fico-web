import { Space } from "antd"
import { submission } from "../../../../../../graphql"
import { useLazyQuery } from "@apollo/react-hooks"
import { useContext, useEffect } from "react"
import { AdminSubmissionContext } from "../../../../../../contexts/admin/submissions/show"
import { useRouter } from "next/router"
import { exportBudget  } from "../../../../../implementer/submissions/new/technical-specification/budget/helpers"
import {
  scheduleExport,
  generalInformationExport,
  technicalSpecificationExport
} from "../../../../projects/show/attachments/documents/helpers"

export function AttachmentsXLSContent() {
  const { client } = useContext(AdminSubmissionContext)
  const router = useRouter()
  const { query: { id } } = router || {}

  const [getGeneralInfo, { data: generalInfo = {} }] = useLazyQuery(submission.queries.getGeneralInfo, {
    client,
    variables: { id }
  })

  const [getTechnicalSpec, { data: technicalSpec = {} }] = useLazyQuery(submission.queries.getTechnicalSpecification, {
    client,
    variables: { id }
  })

  const [getSchedule, { data: schedule = {} }] = useLazyQuery(submission.queries.getTechnicalSpecification,  {
    client, variables: { id }
  })

  const [getBudget, { data: budget = {} }] = useLazyQuery(submission.queries.getBudget,  {
    client, variables: { id }
  })

  useEffect(async () => {
    if (generalInfo.GeneralInformation) {
      await generalInformationExport(generalInfo.GeneralInformation)
    }
  }, [generalInfo])

  useEffect(async () => {
    if (technicalSpec.TechnicalSpecification) {
      await technicalSpecificationExport(technicalSpec.TechnicalSpecification)
    }
  }, [technicalSpec])

  useEffect(async () => {
    if (schedule.TechnicalSpecification) {
      await scheduleExport(schedule.TechnicalSpecification)
    }
  }, [schedule])

  useEffect(async () => {
    if (budget.Budget) {
      await exportBudget(budget.Budget)
    }
  }, [budget])

  return (
    <Space direction="vertical">
      <a onClick={() => getGeneralInfo()}>Información general</a>
      <a onClick={() => getTechnicalSpec()}>Ficha técnica</a>
      <a onClick={() => getBudget()}>Presupuesto</a>
      <a onClick={() => getSchedule()}>Cronograma</a>
      {/*<a onClick={() => {}}>Reportes</a>*/}
      {/*<a onClick={() => {}}>Ministraciones</a>*/}
    </Space>
  )
}
