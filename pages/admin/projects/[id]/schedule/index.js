import { Layout } from "../../../../../components/shared"
import { PageContext } from "../../../../../contexts/page"
import { withApollo } from "../../../../../helpers/withApollo"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { submission } from "../../../../../graphql/submission"
import { useMemo } from "react"
import { useQuery } from "@apollo/react-hooks"

function ProjectSchedulePage({ client, query }) {
  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: query.id }
  })

  const injectActions = useMemo(() => ({
    loading,
    error,
    data
  }), [loading, data])

  return (
    <PageContext.Provider
      value={{ type: "admin", step: "active", submenu: "projects" }}>
      <AdminSubmissionContext.Provider value={injectActions}>
        <Layout subheader={false}>
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

export default withApollo(ProjectSchedulePage)
