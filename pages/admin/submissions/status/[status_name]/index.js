import { Layout } from "../../../../../components/shared"
import { useRouter } from "next/router"
import {
  ListByStatus
} from "../../../../../components/admin/submissions/status"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { PageContext } from "../../../../../contexts/page"
import { submission } from "../../../../../graphql/submission"
import { useMemo, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../helpers/withApollo"
import {
  selectOptions
} from "../../../../../helpers"

function SubmissionsByStatus({ client }) {
  const status = useRouter().query.status_name?.toUpperCase()
  const [ state ] = useState({
    submissionsList: {}
  })

  const { loading, error, data } = useQuery(submission.queries.getByStatus, {
    client: client,
    variables: { status: status }
  })

  const injectActions = useMemo(() => ({
    loading,
    error,
    data
  }), [state, loading])

  const pageTitle = selectOptions
    .getReadableValue(selectOptions.shared.submissionStatusOptions, status)

  return (
    <AdminSubmissionContext.Provider value={injectActions}>
      <PageContext.Provider value={{ title: pageTitle }}>
        <Layout>
          <ListByStatus />
        </Layout>
      </PageContext.Provider>
    </AdminSubmissionContext.Provider>
  )
}

export default withApollo(SubmissionsByStatus)
