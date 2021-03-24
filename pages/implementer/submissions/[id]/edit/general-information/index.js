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
  editData as pageData,
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import { PageContext } from "../../../../../../contexts/page"
import { submission } from "../../../../../../graphql/submission"
import { useState, useMemo, useCallback } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo, selectOptions } from "../../../../../../helpers"
import {
  CommentsProvider
} from "../../../../../../contexts/admin/submissions/review/comments"
import {
  getIsCall,
  setSave,
  setUpdateGeneralInformation
} from "../../../../../../helpers/submissionFunctions/general-information"
import {
  setReviewedComments
} from "../../../../../../helpers/submissionFunctions/comments"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"

function GeneralInformation({ client, query, token }) {
  const [state, setState] = useState({
    generalInformation: {},
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

  const { loading, error, data } = useQuery(submission.queries.getGeneralInfo, {
    client: client,
    variables: { id: query.id }
  })

  const updateGeneralInformation = useCallback(generalInformation => {
    setUpdateGeneralInformation(generalInformation, state, setState)
  }, [state, setState])

  const save = useCallback(async () => {
    await setSave(state, setState, updateSubmission, query.id)
  }, [state])

  const onCommentsReview = useCallback(async comments => {
    await setReviewedComments(comments, setState, updateComments)
  }, [state])

  const isCall = useCallback(() => {
    return getIsCall(data, state)
  }, [data, state])

  const { shared: { submissionStatusOptions: status }} = selectOptions
  const readOnly = data?.GeneralInformation?.state === "PROJECT" ||
    status.findIndex(el => el.value === data?.GeneralInformation?.status) > 8 ||
    (token?.role === "IMPLEMENTER" && data?.GeneralInformation?.status.includes("REVIEW"))
  const hiddenComments = data?.GeneralInformation?.status === "CREATED"

  const injectActions = useMemo(() => ({
    updateGeneralInformation,
    isCall,
    loading,
    readOnly,
    error,
    data,
    hiddenComments
  }), [state, loading, data])

  return (
    <PageContext.Provider value={pageData({ save, step: 0 })}>
      <CommentsProvider
        onCommentsReview={onCommentsReview}
        readOnly
        submission={data?.GeneralInformation}>
        <ImplementerSubmissionContext.Provider value={injectActions}>
          <Layout>
            <SaveHeader isSaving={state.isSaving} save={save} disabled={readOnly} />
            <ProjectDetails />
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
  return AuthCheck(ctx, "IMPLEMENTER")
}

export default withApollo(GeneralInformation)
