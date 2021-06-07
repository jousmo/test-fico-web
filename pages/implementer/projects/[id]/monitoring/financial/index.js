import { Layout } from "../../../../../../components/shared"
import { PageContext } from "../../../../../../contexts/page"
import {
  MonitoringFinancial
} from "../../../../../../components/admin/projects/monitoring"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { submission } from "../../../../../../graphql/submission"
import { useCallback, useMemo } from "react"
import { AdminSubmissionContext } from "../../../../../../contexts/admin/submissions/show"
import { loadingAlert, success, withApollo } from "../../../../../../helpers"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"
import { apolloError } from "../../../../../../helpers/bugsnag/notify"

function FinancialMonitoringPage({ client, query }) {
  const { loading, error, data } = useQuery(submission.queries.getInvoices, {
    client: client,
    variables: { id: query.id }
  })

  const [createDocuments] = useMutation(
    submission.mutations.createDocuments, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getInvoices,
          variables: { id: query.id }
        }
      ]
    }
  )

  const [deleteDocument] = useMutation(
    submission.mutations.deleteDocumentSubmission, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getInvoices,
          variables: { id: query.id }
        }
      ]
    }
  )

  const [saveProjectInvoice] = useMutation(
    submission.mutations.mutateProjectInvoice, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getInvoices,
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
          query: submission.queries.getInvoices,
          variables: { id: query.id }
        }
      ]
    }
  )

  const addBankStatements = useCallback(async ({ documents }) => {
    const saving = loadingAlert("Guardando", 0)
    try {
      const data = documents.map(({ name, url }) => ({ name, url, type: "BANK_STATEMENT", submission: query.id }))
      await createDocuments({ variables: { data } })
      success()
    } catch (e) {
      apolloError(e)
    }
    saving()
  }, [createDocuments])

  const deleteBankStatements = useCallback(async id => {
    const saving = loadingAlert("Eliminando...", 0)
    try {
      await deleteDocument({ variables: { id } })
      success()
    } catch (e) {
      apolloError(e)
    }
    saving()
  }, [deleteDocument])

  const save = useCallback(async expense => {
    const saving = loadingAlert("Guardando", 0)
    try {
      await saveProjectInvoice({ variables: { data: { ...expense, submission: query.id } } })
      success()
    } catch (e) {
      apolloError(e)
    }
    saving()
  }, [saveProjectInvoice])

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
    const saving = loadingAlert("Guardando", 0)
    try {
      const { index, ...newExpense } = expense
      await saveProjectInvoice({ variables: { data: newExpense } })
      success()
    } catch (e) {
      apolloError(e)
    }
    saving()
  }, [saveProjectInvoice])

  const injectActions = useMemo(() => ({
    loading,
    client,
    error,
    data,
    save,
    update,
    deleteInvoice,
    addBankStatements,
    deleteBankStatements
  }), [loading, data])

  return (
    <PageContext.Provider
      value={{ type: "implementer", step: "active", submenu: "projects" }}>
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
