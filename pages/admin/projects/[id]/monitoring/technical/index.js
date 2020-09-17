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
import { useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { success, warning, loadingAlert } from "../../../../../../helpers/alert"
import { cloneDeep } from "lodash"

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

  const [updateActivity] = useMutation(
    submission.mutations.updateActivity, { client: client }
  )

  const updateSubmission = useCallback(async submission => {
    const saving = loadingAlert()
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
    saving()
  }, [updateSub])

  const saveActivity = useCallback(async activity => {
    try {
      await updateActivity({
        variables: { data: activity }
      })
    }
    catch(e) {
      warning()
    }
  }, [updateActivity])

  const save = useCallback(async monitoring => {
    const saving = loadingAlert()
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
    saving()
  }, [createMonitoring, refetch])

  const update = useCallback(async monitoring => {
    const saving = loadingAlert()
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
    saving()
  }, [updateMonitoring, refetch])

  const injectActions = useMemo(() => ({
    updateSubmission,
    saveActivity,
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

export async function getServerSideProps({ query }){
  return {
    props: { query }
  }
}

export default withApollo(TechnicalMonitoringPage)
