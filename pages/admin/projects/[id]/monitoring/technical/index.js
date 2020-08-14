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
import { success } from "../../../../../../helpers/alert"

function TechnicalMonitoringPage({ client, query }) {
  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: query.id }
  })

  const [createMonitoring] = useMutation(
    submission.mutations.createMonitoring, { client: client }
  )

  const save = useCallback(async monitoring => {
    try {
      await createMonitoring({
        variables: { data: monitoring, id: query.id }
      })
      success()
    }
    catch(e) {
      console.error(e)
    }
  }, [createMonitoring])

  const injectActions = useMemo(() => ({
    loading,
    error,
    data,
    save
  }), [loading])

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
