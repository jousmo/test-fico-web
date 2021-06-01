import { Form } from "antd"
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
  Heading,
  ResourcesList
} from "../../../../../../components/implementer/submissions/new/human-resources"
import {
  setSave,
} from "../../../../../../helpers/submissionFunctions/human-resources"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"
import { setReviewedComments } from "../../../../../../helpers/submissionFunctions/comments"


function HumanResources({ client, query, readOnly }) {
  const [form] = Form.useForm()
  const [state, setState] = useState({
    humanResources: [],
    comments: undefined,
    isSaving: false
  })

  const [updateSubmission] = useMutation(
    submission.mutations.updateHumanResources, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getConcepts,
          variables: { id: query.id }
        }
      ]
    }
  )

  const [updateComments] = useMutation(
    submission.mutations.reviewComments, { client: client }
  )

  const { loading, error, data } = useQuery(submission.queries.getConcepts, {
    client: client,
    variables: { id: query.id },
    fetchPolicy: "network-only"
  })

  const updateHumanResources = useCallback(humanResources => {
    if (readOnly) return
    setState({ ...state, humanResources })
  }, [state])

  const save = useCallback(async () => {
    if (readOnly) return
    await setSave(state, setState, updateSubmission, updateComments)
  }, [state])

  const onCommentsReview = useCallback(async comments => {
    if (readOnly) return
    await setReviewedComments(comments, setState)
  }, [state])

  const injectActions = useMemo(() => ({
    commentSubmission: { concepts: data?.Concepts, status: data?.SubmissionSimple?.status },
    updateHumanResources,
    readOnly,
    loading,
    error,
    form,
    data
  }), [loading, data, readOnly])

  const disabledComments = data?.SubmissionSimple?.status.includes("REVISION") || readOnly

  return (
    <PageContext.Provider value={pageData({ save, step: 4 })}>
      <CommentsProvider
        onCommentsReview={onCommentsReview}
        submission={injectActions.commentSubmission}
        readOnly={disabledComments}
        update={updateHumanResources}>
        <ImplementerSubmissionContext.Provider value={injectActions}>
          <Layout>
            <SaveHeader isSaving={state.isSaving} save={save} disabled={readOnly} />
            <Heading />
            <ResourcesList />
          </Layout>
        </ImplementerSubmissionContext.Provider>
      </CommentsProvider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(HumanResources)
