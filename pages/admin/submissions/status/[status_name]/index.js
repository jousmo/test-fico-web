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
import { useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../helpers/withApollo"
import {
  success,
  loadingAlert,
  selectOptions, warning
} from "../../../../../helpers"
import moment from "moment"

function SubmissionsByStatus({ client, query }) {
  const status = query.status_name?.toUpperCase()

  const [updateSubmissionStatus] = useMutation(
    submission.mutations.updateById, {
      client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getAll,
          variables: { state: "SUBMISSION", status: status }
        }
      ]
    }
  )

  const { loading, error, data } = useQuery(submission.queries.getAll, {
    client: client,
    variables: { state: "SUBMISSION", status: status }
  })

  const save = useCallback(async (id, status) => {
    const saving = loadingAlert()
    try {
      await updateSubmissionStatus({
        variables: { data: { status, statusChangedAt: moment().format() }, id: id }
      })
      success()
    }
    catch(e){
      console.error(e)
      warning()
    }
    saving()
  }, [])

  const injectActions = useMemo(() => ({
    loading,
    error,
    data,
    save
  }), [data, loading])

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
