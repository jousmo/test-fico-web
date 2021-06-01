import {
  Layout,
  SaveHeader
} from "../../../../../../components/implementer/submissions"
import {
  data as pageData
} from "../../../../../../contexts/admin/submissions/review"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import { PageContext } from "../../../../../../contexts/page"
import { submission } from "../../../../../../graphql/submission"
import { useState, useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../../helpers"
import {
  CommentsProvider
} from "../../../../../../contexts/admin/submissions/review/comments"
import {
  Budget as BudgetTable
} from "../../../../../../components/implementer/submissions/new/technical-specification"
import {
  setSave,
  setUpdateBudget
} from "../../../../../../helpers/submissionFunctions/budget"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"
import { setReviewedComments } from "../../../../../../helpers/submissionFunctions/comments"


function Budget({ client, query, readOnly }) {
  const submissionId = query.id

  const [state, setState] = useState({
    budget: {},
    comments: undefined,
    dirty: false,
    isSaving: false
  })

  const [updateSubmission] = useMutation(
    submission.mutations.upsertSubmission, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getBudget,
          variables: { id: query.id }
        }
      ]
    }
  )

  const [updateComments] = useMutation(
    submission.mutations.reviewComments, { client: client }
  )

  const { loading, error, data } = useQuery(submission.queries.getBudget, {
    client: client,
    variables: { id: query.id },
    fetchPolicy: "network-only"
  })

  const updateBudget = useCallback(budget => {
    if (readOnly) return
    setUpdateBudget(budget, state, setState)
  }, [state, setState])

  const save = useCallback(async () => {
    if (readOnly) return
    await setSave(state, setState, updateSubmission, submissionId, updateComments)
  }, [state, updateSubmission])

  const onCommentsReview = useCallback(async comments => {
    if (readOnly) return
    await setReviewedComments(comments, setState)
  }, [state])

  const injectActions = useMemo(() => ({
    updateBudget,
    readOnly,
    loading,
    error,
    data,
    review: false
  }), [state, loading, data, readOnly])

  const disabledComments = data?.Budget?.status.includes("REVISION") || readOnly

  return (
    <PageContext.Provider value={pageData({ save, step: 2 })}>
      <CommentsProvider
        onCommentsReview={onCommentsReview}
        submission={data?.Budget}
        readOnly={disabledComments}
        update={updateBudget}>
        <ImplementerSubmissionContext.Provider value={injectActions}>
          <Layout>
            <SaveHeader isSaving={state.isSaving} save={save} disabled={readOnly} />
            <BudgetTable admin={true} />
          </Layout>
        </ImplementerSubmissionContext.Provider>
      </CommentsProvider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(Budget)
