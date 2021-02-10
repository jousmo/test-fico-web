import { Layout } from "../../../../../../components/shared"
import { PageContext } from "../../../../../../contexts/page"
import {
  MonitoringFinancial
} from "../../../../../../components/admin/projects/monitoring"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { submission } from "../../../../../../graphql/submission"
import { useCallback, useMemo } from "react"
import { AdminSubmissionContext } from "../../../../../../contexts/admin/submissions/show"
import { success, loadingAlert, withApollo } from "../../../../../../helpers"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"
import { apolloError } from "../../../../../../helpers/bugsnag/notify"

function FinancialMonitoringPage({ client, query }) {
  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: query.id }
  })

  const [createProjectInvoice] = useMutation(
    submission.mutations.createProjectInvoice, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getById,
          variables: { id: query.id }
        }
      ]
    }
  )

  const [updateProjectInvoice] = useMutation(
    submission.mutations.updateProjectInvoice, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getById,
          variables: { id: query.id }
        }
      ]
    }
  )

  const [deleteProjectInvoice] = useMutation(
    submission.mutations.deleteProjectInvoice, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getById,
          variables: { id: query.id }
        }
      ]
    }
  )

  const save = useCallback(async expense => {
    const saving = loadingAlert("Guardando", 0)
    try {
      await createProjectInvoice({ variables: { data: expense, id: query.id } })
      saving()
      success()
    } catch (e) {
      apolloError(e)
    }
  }, [createProjectInvoice])

  const deleteInvoice = useCallback(async id => {
    const saving = loadingAlert("Eliminando", 0)
    try {
      await deleteProjectInvoice({ variables: { id } })
      success("Eliminado correctamente")
    } catch (e) {
      apolloError(e)
    }
    saving()
  }, [deleteProjectInvoice])

  const update = useCallback(async expense => {
    const saving = loadingAlert("Actualizando", 0)
    try {
      const { id, index, ...newExpense } = expense
      await updateProjectInvoice({ variables: { data: newExpense, id } })
      saving()
      success()
    } catch (e) {
      apolloError(e)
    }
  }, [updateProjectInvoice])

  const injectActions = useMemo(() => ({
    loading,
    error,
    data,
    save,
    update,
    deleteInvoice
  }), [loading, data])

  return (
    <PageContext.Provider
      value={{ type: "admin", step: "active", submenu: "projects" }}>
      <AdminSubmissionContext.Provider value={injectActions}>
        <Layout subheader={false}>
          <MonitoringFinancial />
        </Layout>
      </AdminSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(FinancialMonitoringPage)
