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
  setSave,
  setUpdateTechnicalSpecification
} from "../../../../../../helpers/submissionFunctions/technical-specification"
import {
  DevelopmentObjective,
  GeneralObjective,
  SpecificObjectives
} from "../../../../../../components/implementer/submissions/new/technical-specification"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"
import { setReviewedComments } from "../../../../../../helpers/submissionFunctions/comments"


function TechnicalSpecification({ client, query }) {
  const submissionId = query.id

  const [state, setState] = useState({
    technicalSpecification: {},
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
          query: submission.queries.getTechnicalSpecification,
          variables: { id: query.id }
        }
      ]
    }
  )

  const [updateComments] = useMutation(
    submission.mutations.reviewComments, { client: client }
  )

  const { loading, error, data } = useQuery(submission.queries.getTechnicalSpecification, {
    client: client,
    variables: { id: query.id }
  })

  const updateTechnicalSpecification = useCallback(technicalSpecification => {
    setUpdateTechnicalSpecification(technicalSpecification, state, setState)
  }, [state])

  const save = useCallback(async () => {
    await setSave(state, setState, updateSubmission, submissionId, updateComments)
  }, [state])

  const onCommentsReview = useCallback(async comments => {
    await setReviewedComments(comments, setState)
  }, [state])

  const injectActions = useMemo(() => ({
    updateTechnicalSpecification,
    readOnly: false,
    loading,
    error,
    data,
    review: false
  }), [state, loading, data])

  const disabledComments = data?.TechnicalSpecification?.status.includes("REVISION")

  return (
    <PageContext.Provider value={pageData({ save, step: 1 })}>
      <CommentsProvider
        onCommentsReview={onCommentsReview}
        submission={data?.TechnicalSpecification}
        readOnly={disabledComments}
        update={updateTechnicalSpecification}>
        <ImplementerSubmissionContext.Provider value={injectActions}>
          <Layout>
            <SaveHeader isSaving={state.isSaving} save={save} disabled={false} />
            <DevelopmentObjective admin />
            <GeneralObjective />
            <SpecificObjectives />
          </Layout>
        </ImplementerSubmissionContext.Provider>
      </CommentsProvider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(TechnicalSpecification)
