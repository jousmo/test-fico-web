import { Layout } from "../../../../../../components/shared"
import { PageContext } from "../../../../../../contexts/page"
import {
  MonitoringFinancial
} from "../../../../../../components/admin/projects/monitoring"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { submission } from "../../../../../../graphql/submission"
import { useCallback, useMemo } from "react"
import { AdminSubmissionContext } from "../../../../../../contexts/admin/submissions/show"
import { Bugsnag, loadingAlert, success, warning, withApollo } from "../../../../../../helpers"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"

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
      success()
    } catch (e) {
      warning()
      Bugsnag.notify(new Error(e))
      console.error(e)
    }
    saving()
  }, [createProjectInvoice])

  const deleteInvoice = useCallback(async id => {
    const saving = loadingAlert("Eliminando", 0)
    try {
      await deleteProjectInvoice({ variables: { id } })
      saving()
      success("Eliminado correctamente")
    } catch (e) {
      warning()
      Bugsnag.notify(new Error(e))
      console.error(e)
    }
  }, [deleteProjectInvoice])

  const update = useCallback(async expense => {
    const saving = loadingAlert("Guardando", 0)
    try {
      const { id, index, ...newExpense } = expense
      await updateProjectInvoice({ variables: { data: newExpense, id } })
      success()
    } catch (e) {
      warning()
      Bugsnag.notify(new Error(e))
      console.error(e)
    }
    saving()
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
  return AuthCheck(ctx, "IMPLEMENTER")
}

export default withApollo(FinancialMonitoringPage)
