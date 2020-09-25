import {
  Layout,
  SaveHeader
} from "../../../../../../components/implementer/submissions"
import {
  ProjectDetails,
  DevelopmentObjectives,
  Beneficiaries,
  Consultant
} from "../../../../../../components/implementer/submissions/new/general-information"
import {
  editData as pageData,
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import { PageContext } from "../../../../../../contexts/page"
import { submission } from "../../../../../../graphql/submission"
import { useState, useMemo, useCallback } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../../helpers/withApollo"
import {
  CommentsProvider
} from "../../../../../../contexts/admin/submissions/review/comments"
import {
  getIsCall,
  setSave,
  setUpdateGeneralInformation
} from "../../../../../../helpers/submissionFunctions/general-information"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"

function GeneralInformation({ client, query }) {
  const [state, setState] = useState({
    generalInformation: {},
    dirty: false,
    isSaving: false
  })

  const [updateSubmission] = useMutation(
    submission.mutations.updateById, { client: client }
  )

  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: query.id }
  })

  const updateGeneralInformation = useCallback(generalInformation => {
    setUpdateGeneralInformation(generalInformation, state, setState)
  }, [state, setState])

  const save = useCallback(async () => {
    await setSave(state, setState, updateSubmission, query.id)
  }, [state])

  const isCall = useCallback(() => {
    return getIsCall(data, state)
  }, [data, state])

  const readOnly = data?.Submission?.state === "PROJECT"
  const hiddenComments = data?.Submission?.status === "CREATED"

  const injectActions = useMemo(() => ({
    updateGeneralInformation,
    isCall,
    loading,
    error,
    data,
    hiddenComments
  }), [state, loading])

  return (
    <PageContext.Provider value={pageData({ save, step: 0 })}>
      <CommentsProvider
        readOnly
        submission={data?.Submission}>
        <ImplementerSubmissionContext.Provider value={injectActions}>
          <Layout>
            <SaveHeader isSaving={state.isSaving} save={save} disabled={readOnly} />
            <ProjectDetails />
            <Consultant />
            <DevelopmentObjectives />
            <Beneficiaries />
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
