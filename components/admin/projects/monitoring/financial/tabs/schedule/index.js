import { Skeleton } from "antd"
import React, { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../../../contexts/admin/submissions/show"
import { useQuery } from "@apollo/react-hooks"
import { submission } from "../../../../../../../graphql"
import { useRouter } from "next/router"
import { MonitoringSchedule } from "../../../technical/tabs/schedule"

export function FinancialSchedule(){
  const router = useRouter()
  const { client } = useContext(AdminSubmissionContext)
  const { loading, data } = useQuery(submission.queries.getTechnicalSpecification, {
    client: client,
    variables: { id: router?.query.id }
  })

  if (loading) {
    return <Skeleton active />
  }

  return (
    <MonitoringSchedule data={data} dateFilter={[]} />
  )
}
