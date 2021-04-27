import {
  Layout
} from "../../../../../../components/implementer/submissions"
import {
  data as pageData
} from "../../../../../../contexts/admin/submissions/review"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import { PageContext } from "../../../../../../contexts/page"
import { submission } from "../../../../../../graphql/submission"
import { useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../../helpers"
import {
  SubmissionComments
} from "../../../../../../components/implementer/submissions/new/comments"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"
import { setSave } from "../../../../../../helpers/submissionFunctions/comments"

function CommentsPage({ client, query }) {
  const id = query.id

  const { loading, error, data } = useQuery(submission.queries.getGeneralInfo, {
    client: client,
    variables: { id }
  })

  const [updateSubmission] = useMutation(
    submission.mutations.upsertSubmission, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [{
        query: submission.queries.getGeneralInfo,
        variables: { id }
      }]
    }
  )

  const save = useCallback(async comments => {
    await setSave(comments, updateSubmission, id)
  }, [updateSubmission])

  const injectActions = useMemo(() => ({
    readOnly: true,
    loading,
    error,
    save,
    data
  }), [loading, data])

  return (
    <PageContext.Provider value={pageData({ save, step: 5 })}>
      <ImplementerSubmissionContext.Provider value={injectActions}>
        <Layout>
          <SubmissionComments />
        </Layout>
      </ImplementerSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "IMPLEMENTER")
}

export default withApollo(CommentsPage)
