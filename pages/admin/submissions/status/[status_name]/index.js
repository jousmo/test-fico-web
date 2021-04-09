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
import { success, loadingAlert, selectOptions, withApollo } from "../../../../../helpers"
import moment from "moment"
import { AuthCheck } from "../../../../../helpers/auth/auth-check"
import { apolloError } from "../../../../../helpers/bugsnag/notify"

function SubmissionsByStatus({ client, query }) {
  const status = query.status_name?.toUpperCase()

  const [updateSubmissionStatus] = useMutation(
    submission.mutations.upsertSubmission, {
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
        variables: { data: { status, statusChangedAt: moment().format(), id } }
      })
      success()
    }
    catch(e){
      apolloError(e)
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

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(SubmissionsByStatus)
