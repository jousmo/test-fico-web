import { Layout } from "../../../../../components/shared"
import { ListByStatus } from "../../../../../components/admin/projects/status"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { submission } from "../../../../../graphql/submission"
import { useMemo } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../helpers/withApollo"
import { PageContext } from "../../../../../contexts/page"
import { selectOptions } from "../../../../../helpers"
import { AuthCheck } from "../../../../../helpers/auth/auth-check"

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
        type: "admin",
        title: pageTitle,
        submenu: "projects"
      }}>
      <AdminSubmissionContext.Provider value={injectActions}>
        <Layout>
          <ListByStatus />
        </Layout>
      </AdminSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(ProjectsByStatus)
