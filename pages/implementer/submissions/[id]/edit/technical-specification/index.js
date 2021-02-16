import {
  Layout,
  SaveHeader
} from "../../../../../../components/implementer/submissions"
import {
  data as pageData,
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
  setSave,
  setUpdateTechnicalSpecification
} from "../../../../../../helpers/submissionFunctions/technical-specification"
import {
  setReviewedComments
} from "../../../../../../helpers/submissionFunctions/comments"
import {
  DevelopmentObjective,
  GeneralObjective,
  SpecificObjectives
} from "../../../../../../components/implementer/submissions/new/technical-specification"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"


function TechnicalSpecification({ client, query }) {
  const submissionId = query.id

  const [state, setState] = useState({
    technicalSpecification: {},
    dirty: false,
    isSaving: false
  })

  const [updateSubmission] = useMutation(
    submission.mutations.updateTechnicalSpecification, {
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

  const { loading, error, data } = useQuery(submission.queries.getTechnicalSpecification, {
    client: client,
    variables: { id: submissionId }
  })

  const updateTechnicalSpecification = useCallback(technicalSpecification => {
    setUpdateTechnicalSpecification(technicalSpecification, state, setState)
  }, [state])

  const save = useCallback(async () => {
    await setSave(state, setState, updateSubmission, submissionId)
    setState({ ...state, technicalSpecification: {} })
  }, [state])

  const onCommentsReview = useCallback(async comments => {
    await setReviewedComments(comments, setState, updateComments)
  }, [state])

  const readOnly = data?.TechnicalSpecification?.state === "PROJECT"
  const hiddenComments = data?.TechnicalSpecification?.status === "CREATED"

  const injectActions = useMemo(() => ({
    updateTechnicalSpecification,
    loading,
    error,
    data,
    hiddenComments
  }), [state, loading, data])

  return (
    <PageContext.Provider value={pageData({ save, step: 1 })}>
      <CommentsProvider
        onCommentsReview={onCommentsReview}
        readOnly
        submission={data?.TechnicalSpecification}>
        <ImplementerSubmissionContext.Provider value={injectActions}>
          <Layout>
            <SaveHeader isSaving={state.isSaving} save={save} disabled={readOnly} />
            <DevelopmentObjective />
            <GeneralObjective />
            <SpecificObjectives />
          </Layout>
        </ImplementerSubmissionContext.Provider>
      </CommentsProvider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "IMPLEMENTER")
}

export default withApollo(TechnicalSpecification)
