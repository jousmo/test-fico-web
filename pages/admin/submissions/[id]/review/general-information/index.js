import {
  Layout,
  SaveHeader
} from "../../../../../../components/implementer/submissions"
import {
  ProjectDetails,
  DevelopmentObjectives,
  Beneficiaries,
  Consultant,
  Documents
} from "../../../../../../components/implementer/submissions/new/general-information"
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
  getIsCall,
  setSave,
  setUpdateGeneralInformation
} from "../../../../../../helpers/submissionFunctions/general-information"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"
import { setReviewedComments } from "../../../../../../helpers/submissionFunctions/comments"


function GeneralInformation({ client, query, readOnly }) {
  const submissionId = query.id

  const [state, setState] = useState({
    generalInformation: {},
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
          query: submission.queries.getGeneralInfo,
          variables: { id: query.id }
        }
      ]
    }
  )

  const [updateComments] = useMutation(
    submission.mutations.reviewComments, { client: client }
  )

  const { loading, error, data } = useQuery(submission.queries.getGeneralInfo, {
    client: client,
    variables: { id: query.id }
  })

  const { data: details } = useQuery(submission.queries.getDetails, {
    client: client,
    variables: { id: query.id }
  })

  const updateGeneralInformation = useCallback(generalInformation => {
    if (readOnly) return
    setUpdateGeneralInformation(generalInformation, state, setState)
  }, [state, setState])

  const save = useCallback(async () => {
    if (readOnly) return
    await setSave(state, setState, updateSubmission, submissionId, updateComments)
  }, [state])

  const onCommentsReview = useCallback(async comments => {
    if (readOnly) return
    await setReviewedComments(comments, setState)
  }, [state])

  const isCall = useCallback(() => {
    return getIsCall(data, state)
  }, [data, state])

  const injectActions = useMemo(() => ({
    updateGeneralInformation,
    readOnly,
    loading,
    details,
    isCall,
    error,
    data,
    review: false
  }), [state, loading, data, readOnly])

  const disabledComments = data?.GeneralInformation?.status.includes("REVISION") || readOnly

  return (
    <PageContext.Provider value={pageData({ save, step: 0 })}>
      <CommentsProvider
        onCommentsReview={onCommentsReview}
        submission={data?.GeneralInformation}
        readOnly={disabledComments}
        update={updateGeneralInformation}>
        <ImplementerSubmissionContext.Provider value={injectActions}>
          <Layout>
            <SaveHeader isSaving={state.isSaving} save={save} disabled={readOnly} />
            <ProjectDetails admin />
            <Consultant />
            <DevelopmentObjectives />
            <Beneficiaries />
            <Documents />
          </Layout>
        </ImplementerSubmissionContext.Provider>
      </CommentsProvider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(GeneralInformation)
