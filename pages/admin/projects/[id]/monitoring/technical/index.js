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
import { useMemo, useState } from "react"
import { useQuery } from "@apollo/react-hooks"

function TechnicalMonitoringPage({ client, query }) {
  const [ state ] = useState({
    project: {}
  })

  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: query.id }
  })

  const injectActions = useMemo(() => ({
    loading,
    error,
    data
  }), [state, loading])

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
