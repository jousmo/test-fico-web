import { Layout } from "../../../../../components/shared"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { submission } from "../../../../../graphql/submission"
import { useMemo } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../helpers/withApollo"
import { PageContext } from "../../../../../contexts/page"
import { selectOptions } from "../../../../../helpers"

function ProjectsByStatus({ client, query }) {
  const status = query.status_name?.toUpperCase()

  const { loading, error, data } = useQuery(submission.queries.getAll, {
    client: client,
    variables: { state: "PROJECT", status: status }
  })

  const injectActions = useMemo(() => ({
    loading,
    error,
    data
  }), [loading])

  const pageTitle = selectOptions
    .getReadableValue(selectOptions.shared.projectStatusOptions, status)

  return (
    <PageContext.Provider
      value={{
        step: status,
        title: pageTitle,
        type: "implementer",
        submenu: "projects"
      }}>
      <AdminSubmissionContext.Provider value={injectActions}>
        <Layout>

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

export default withApollo(ProjectsByStatus)
