import { Layout } from "../../../../../../components/shared"
import { PageContext } from "../../../../../../contexts/page"
import { withApollo } from "../../../../../../helpers/withApollo"
import {
  AdminSubmissionContext
} from "../../../../../../contexts/admin/submissions/show"
import {
  TechnicalMonitoring
} from "../../../../../../components/admin/projects/monitoring"
import { submission } from "../../../../../../graphql/submission"
import React, { useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { success, warning } from "../../../../../../helpers/alert"
import { cloneDeep } from "lodash"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"

function TechnicalMonitoringPage({ client, query }) {
  const { loading, error, data, refetch } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: query.id }
  })

  const [createMonitoring] = useMutation(
    submission.mutations.createMonitoring, { client: client }
  )

  const [updateMonitoring] = useMutation(
    submission.mutations.updateMonitoring, { client: client }
  )

  const [updateSub] = useMutation(
    submission.mutations.updateById, { client: client }
  )

  const [createProjectAssistants] = useMutation(
    submission.mutations.createProjectAssistants, { client: client }
  )

  const createAssistants = useCallback(async assistant => {
    try {
      await createProjectAssistants({
        variables: { data: assistant, id: query.id }
      })
      success()
      refetch()
    }
    catch(e) {
      warning()
      console.error(e)
    }
  }, [createProjectAssistants, refetch])

  const updateSubmission = useCallback(async submission => {
    try {
      await updateSub({
        variables: { data: submission, id: query.id }
      })
      success()
    }
    catch(e) {
      warning()
      console.error(e)
    }
  }, [updateSub])

  const save = useCallback(async monitoring => {
    try {
      await createMonitoring({
        variables: { data: monitoring, id: query.id }
      })
      success()
      refetch()
    }
    catch(e) {
      warning()
      console.error(e)
    }
  }, [createMonitoring, refetch])

  const update = useCallback(async monitoring => {
    const newMonitoring = cloneDeep(monitoring)
    const { id, ...updatedMonitoring } = newMonitoring

    updatedMonitoring.participants = [...updatedMonitoring.participants]
      .map(({uuid, ...p}) => p)

    try {
      await updateMonitoring({
        variables: { data: updatedMonitoring, id: id }
      })
      success()
      refetch()
    }
    catch(e) {
      warning()
      console.error(e)
    }
  }, [updateMonitoring, refetch])

  const injectActions = useMemo(() => ({
    createAssistants,
    updateSubmission,
    loading,
    update,
    error,
    data,
    save
  }), [loading, data])

  return (
    <PageContext.Provider
      value={{ type: "admin", step: "active", submenu: "projects" }}>
      <AdminSubmissionContext.Provider value={injectActions}>
        <Layout subheader={false}>
          <TechnicalMonitoring />
        </Layout>
      </AdminSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "IMPLEMENTER")
}

export default withApollo(TechnicalMonitoringPage)
