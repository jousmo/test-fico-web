import {
  Layout,
  SaveHeader
} from "../../../../../../components/implementer/submissions"
import {
  editData as pageData,
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import { PageContext } from "../../../../../../contexts/page"
import { submission } from "../../../../../../graphql/submission"
import { useState, useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../../helpers/withApollo"
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
import {
  setReviewedComments
} from "../../../../../../helpers/submissionFunctions/comments"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"
import {selectOptions} from "../../../../../../helpers"

function Budget({ client, query, token }) {
  const submissionId = query.id

  const [state, setState] = useState({
    budget: {},
    dirty: false,
    isSaving: false
  })

  const [updateSubmission] = useMutation(
    submission.mutations.updateBudget, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getBudget,
          variables: { id: query.id }
        },
      ]
    }
  )

  const [updateComments] = useMutation(
    submission.mutations.reviewComments, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getGeneralInfo,
          variables: { id: query.id }
        }
      ]
    }
  )

  const { loading, error, data } = useQuery(submission.queries.getBudget, {
    client: client,
    variables: { id: query.id },
    fetchPolicy: "network-only"
  })

  const updateBudget = useCallback(budget => {
    setUpdateBudget(budget, state, setState)
  }, [state, setState])

  const save = useCallback(async () => {
    await setSave(state, setState, updateSubmission, submissionId)
    setState({ ...state, budget: {} })
  }, [state, updateSubmission])

  const onCommentsReview = useCallback(async comments => {
    await setReviewedComments(comments, setState, updateComments)
  }, [state])

  const { shared: { submissionStatusOptions: status }} = selectOptions
  const readOnly = data?.Budget?.state === "PROJECT" ||
    status.findIndex(el => el.value === data?.Budget?.status) > 8 ||
    (token?.role === "IMPLEMENTER" && data?.Budget?.status.includes("REVIEW"))
  const hiddenComments = data?.Budget?.status === "CREATED"

  const injectActions = useMemo(() => ({
    updateBudget,
    readOnly,
    loading,
    error,
    data,
    hiddenComments
  }), [state, loading, data])

  return (
    <PageContext.Provider value={pageData({ save, step: 2 })}>
      <CommentsProvider
        onCommentsReview={onCommentsReview}
        readOnly
        submission={data?.Budget}>
        <ImplementerSubmissionContext.Provider value={injectActions}>
          <Layout>
            <SaveHeader isSaving={state.isSaving} save={save} disabled={readOnly} />
            <BudgetTable />
          </Layout>
        </ImplementerSubmissionContext.Provider>
      </CommentsProvider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "IMPLEMENTER")
}

export default withApollo(Budget)
