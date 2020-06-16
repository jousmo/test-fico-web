import { Layout } from "../../../components/shared"
import {
  ProjectListing
} from "../../../components/admin/projects/list"
import {
  AdminSubmissionContext
} from "../../../contexts/admin/submissions/show"
import { submission } from "../../../graphql/submission"
import { useMemo, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../helpers/withApollo"

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
    <AdminSubmissionContext.Provider value={injectActions}>
      <Layout subheader={false}>
        <ProjectListing />
      </Layout>
    </AdminSubmissionContext.Provider>
  )
}

export default withApollo(ProjectsList)
