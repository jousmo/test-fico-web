import { Layout } from "../../../../../../components/shared"
import { PageContext } from "../../../../../../contexts"
import {
  AdminSubmissionContext
} from "../../../../../../contexts/admin/submissions/show"
import {
  TechnicalMonitoring
} from "../../../../../../components/admin/projects/monitoring"
import { submission } from "../../../../../../graphql"
import { useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { success, loadingAlert, withApollo } from "../../../../../../helpers"
import { cloneDeep } from "lodash"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"
import { apolloError } from "../../../../../../helpers/bugsnag/notify"

function TechnicalMonitoringPage({ client, query, readOnly }) {
  const { loading, error, data, refetch } = useQuery(submission.queries.getTechnicalMonitoring, {
    client: client,
    variables: { id: query.id }
  })

  const [saveMonitoring] = useMutation(
    submission.mutations.mutateMonitoring, { client: client }
  )

  const [updateSub] = useMutation(
    submission.mutations.upsertSubmission, { client: client }
  )

  const [updateActivity] = useMutation(
    submission.mutations.updateActivity, { client: client }
  )

  const updateSubmission = useCallback(async submission => {
    if (readOnly) return
    const saving = loadingAlert()
    try {
      await updateSub({
        variables: { data: { ...submission, id: query.id } }
      })
      success()
    } catch(e) {
      apolloError(e)
    }
    saving()
  }, [updateSub])

  const saveActivity = useCallback(async activity => {
    if (readOnly) return
    try {
      await updateActivity({
        variables: { data: activity }
      })
    } catch(e) {
      apolloError(e)
    }
  }, [updateActivity])

  const save = useCallback(async monitoring => {
    if (readOnly) return
    const saving = loadingAlert()
    try {
      await saveMonitoring({
        variables: { data: { ...monitoring, submission: query.id } }
      })
      await refetch()
      success()
    } catch(e) {
      apolloError(e)
    }
    saving()
  }, [saveMonitoring, refetch])

  const update = useCallback(async monitoring => {
    if (readOnly) return
    const saving = loadingAlert()
    const newMonitoring = cloneDeep(monitoring)

    if (newMonitoring.participants) {
      newMonitoring.participants = [...newMonitoring.participants]
        ?.map(({uuid, ...p}) => p)
    }

    try {
      await saveMonitoring({
        variables: { data: newMonitoring }
      })
      await refetch()
      success()
    } catch(e) {
      apolloError(e)
    }
    saving()
  }, [saveMonitoring, refetch])

  const injectActions = useMemo(() => ({
    updateSubmission,
    saveActivity,
    readOnly,
    loading,
    update,
    error,
    data,
    save
  }), [loading, data, readOnly])

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
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(TechnicalMonitoringPage)
