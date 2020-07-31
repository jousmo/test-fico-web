import { Layout } from "../../../components/shared"
import {
  ProjectListing
} from "../../../components/implementer/projects/list"
import {
  ImplementerSubmissionContext
} from "../../../contexts/implementer/submissions/show"
import { PageContext } from "../../../contexts/page"
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
    <PageContext.Provider
      value={{ type: "implementer", step: "active", submenu: "projects" }}>
      <ImplementerSubmissionContext.Provider value={injectActions}>
        <Layout subheader={false}>
          <ProjectListing />
        </Layout>
      </ImplementerSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export default withApollo(ProjectsList)
