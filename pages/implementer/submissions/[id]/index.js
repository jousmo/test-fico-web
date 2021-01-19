import { Layout } from "../../../../components/shared"
import {
  SubmissionSummary,
  AgreementDocuments
} from "../../../../components/implementer/submissions/show"
import {
  ImplementerSubmissionContext
} from "../../../../contexts/implementer/submissions/show"
import { submission } from "../../../../graphql/submission"
import { useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { Bugsnag, loadingAlert, success, warning, withApollo } from "../../../../helpers"
import { PageContext } from "../../../../contexts/page"
import { AuthCheck } from "../../../../helpers/auth/auth-check"

function Submission({ client, query }) {
  const [ updateSubmission ] = useMutation(
    submission.mutations.updateById, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getDetails,
          variables: { id: query.id }
        }
      ]
    }
  )

  const { loading, error, data, refetch } = useQuery(submission.queries.getDetails, {
    client: client,
    variables: { id: query.id }
  })

  const save = useCallback(async submissionData => {
    const saving = loadingAlert()
    try {
      await updateSubmission({
        variables: { data: submissionData, id: query.id }
      })
      success()
    }
    catch (e) {
      Bugsnag.notify(new Error(e))
      console.error(e)
      warning()
    }
    saving()
  }, [query.id])

  const injectActions = useMemo(() => ({
    loading,
    error,
    data,
    save,
    client,
    refetch
  }), [loading, data])

  return (
    <PageContext.Provider
      value={{ type: "implementer", submenu: "submissions" }}>
      <ImplementerSubmissionContext.Provider value={injectActions}>
        <Layout subheader={<SubmissionSummary />}>
          <AgreementDocuments />
        </Layout>
      </ImplementerSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "IMPLEMENTER")
}

export default withApollo(Submission)
