import { Layout } from "../../../components/shared"
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

function AdminSubmissions({ client }) {
  const [ state ] = useState({
    submissionsList: {}
  })

  const { loading, error, data } = useQuery(submission.queries.getAll, {
    client: client
  })

  const injectActions = useMemo(() => ({
    loading,
    error,
    data
  }), [state, loading])

  return (
    <AdminSubmissionContext.Provider value={injectActions}>
      <Layout subheader={false}>
        <SubmissionsListing />
      </Layout>
    </AdminSubmissionContext.Provider>
  )
}

export default withApollo(AdminSubmissions)
