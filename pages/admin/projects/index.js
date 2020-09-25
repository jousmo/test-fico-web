import { Layout } from "../../../components/shared"
import {
  ProjectListing
} from "../../../components/admin/projects/list"
import {
  AdminSubmissionContext
} from "../../../contexts/admin/submissions/show"
import { PageContext } from "../../../contexts/page"
import { submission } from "../../../graphql/submission"
import { useMemo, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../helpers/withApollo"
import { AuthCheck } from "../../../helpers/auth/auth-check"

function ProjectsList({ client }) {
  const [ state ] = useState({
    projects: {}
  })

  const { loading, error, data } = useQuery(submission.queries.getAll, {
    client: client,
    variables: { state: "PROJECT" }
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
          <ProjectListing />
        </Layout>
      </AdminSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(ProjectsList)
