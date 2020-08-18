import { Layout } from "../../../../../../components/shared"
import { PageContext } from "../../../../../../contexts/page"
import { withApollo } from "../../../../../../helpers/withApollo"
import {
  MonitoringFinancial
} from "../../../../../../components/admin/projects/monitoring"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { submission } from "../../../../../../graphql/submission"
import { useCallback, useMemo } from "react"
import { AdminSubmissionContext } from "../../../../../../contexts/admin/submissions/show"
import { useRouter } from "next/router"
import { success, warning } from "../../../../../../helpers/alert"

function FinancialMonitoringPage({ client }) {
  const router = useRouter()

  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: router.query.id }
  })

  const [createProjectInvoice] = useMutation(
    submission.mutations.createProjectInvoice, { client: client }
  )

  const [updateProjectInvoice] = useMutation(
    submission.mutations.updateProjectInvoice, { client: client }
  )

  const save = useCallback(async expense => {
    try {
      await createProjectInvoice({ variables: { data: expense, id: router.query.id } })
      success()
    } catch (e) {
      warning()
      console.error(e)
    }
  }, [createProjectInvoice])

  const update = useCallback(async expense => {
    try {
      const { id, index, ...newExpense } = expense
      await updateProjectInvoice({ variables: { data: newExpense, id } })
      success()
    } catch (e) {
      warning()
      console.error(e)
    }
  }, [updateProjectInvoice])

  const injectActions = useMemo(() => ({
    loading,
    error,
    data,
    save,
    update
  }), [loading])

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

export async function getServerSideProps({ query }){
  return {
    props: { query }
  }
}

export default withApollo(FinancialMonitoringPage)
