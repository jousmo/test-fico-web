import { Layout } from "../../../../../../components/shared"
import { PageContext } from "../../../../../../contexts/page"
import { withApollo } from "../../../../../../helpers/withApollo"
import {
  MonitoringFinancial
} from "../../../../../../components/admin/projects/monitoring"
import { useQuery } from "@apollo/react-hooks"
import { submission } from "../../../../../../graphql/submission"
import { useMemo } from "react"
import { AdminSubmissionContext } from "../../../../../../contexts/admin/submissions/show"
import { useRouter } from "next/router"

function FinancialMonitoringPage({ client }) {
  const router = useRouter()

  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: router.query.id }
  })

  const injectActions = useMemo(() => ({
    loading,
    router,
    error,
    data
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
