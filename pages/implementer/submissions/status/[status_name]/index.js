import { Layout } from "../../../../../components/shared"
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

function SubmissionsByStatus({ client, query }) {
  const status = query.status_name?.toUpperCase()
  const [ state ] = useState({
    submissionsList: {}
  })

  const { loading, error, data } = useQuery(submission.queries.getAll, {
    client: client,
    variables: { state: "SUBMISSION", status: status }
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
      <PageContext.Provider
        value={{
          step: status,
          submenu: "submissions",
          title: pageTitle,
          type: "implementer"
        }}>
        <Layout>
          <ListByStatus />
        </Layout>
      </PageContext.Provider>
    </AdminSubmissionContext.Provider>
  )
}

export async function getServerSideProps({ query }){
  return {
    props: { query }
  }
}

export default withApollo(SubmissionsByStatus)
