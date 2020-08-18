import { Layout } from "../../../../../components/shared"
import {
  ListByStatus,
} from "../../../../../components/admin/submissions/status"
import {
  ApproveByStatus
} from "../../../../../components/admin/submissions/status/approve-by-status"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { PageContext } from "../../../../../contexts/page"
import { submission } from "../../../../../graphql/submission"
import { useCallback, useMemo, useState } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../helpers/withApollo"
import {
  selectOptions
} from "../../../../../helpers"

function SubmissionsByStatus({ client, query }) {
  const status = query.status_name?.toUpperCase()
  const [ state ] = useState({
    submissionsList: {}
  })

  const [updateSubmissionStatus] = useMutation(
    submission.mutations.updateById, { client }
  )

  const { loading, error, data } = useQuery(submission.queries.getAll, {
    client: client,
    variables: { state: "SUBMISSION", status: status }
  })

  const save = useCallback(async (id, status) => {
    try {
      await updateSubmissionStatus({
        variables: { data: { status }, id: id }
      })
    }
    catch(e){
      console.error(e)
    }
  }, [state])

  const injectActions = useMemo(() => ({
    loading,
    error,
    data,
    save
  }), [state, loading])

  const pageTitle = selectOptions
    .getReadableValue(selectOptions.shared.submissionStatusOptions, status)

  let list = <ListByStatus />
  if (status === "ON_COUNCIL" || status === "ON_COMMITTEE"){
    list = <ApproveByStatus />
  }

  return (
    <AdminSubmissionContext.Provider value={injectActions}>
      <PageContext.Provider
        value={{
          step: status,
          submenu: "submissions",
          title: pageTitle,
          type: "admin"
        }}>
        <Layout>
          {list}
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
