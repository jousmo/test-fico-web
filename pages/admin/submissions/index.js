import { Layout } from "../../../components/shared"
import { useRouter } from "next/router"
import {
  SubmissionsListing
} from "../../../components/admin/submissions/list"
import {
  AdminSubmissionContext
} from "../../../contexts/admin/submissions/show"
import { submission } from "../../../graphql/submission"
import { useMemo, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../helpers/withApollo"
import { PageContext } from "../../../contexts/page"

function AdminSubmissions({ client }) {
  const router = useRouter()
  const [ state ] = useState({
    submissionsList: {}
  })

  const { loading, error, data } = useQuery(submission.queries.getAll, {
    client: client,
    variables: { state: "SUBMISSION" }
  })

  const injectActions = useMemo(() => ({
    loading,
    router,
    error,
    data
  }), [state, loading])

  return (
    <PageContext.Provider
      value={{
        type: "admin",
        step: "submissions",
        submenu: "submissions"
      }}>
      <AdminSubmissionContext.Provider value={injectActions}>
        <Layout subheader={false}>
          <SubmissionsListing />
        </Layout>
      </AdminSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export default withApollo(AdminSubmissions)
