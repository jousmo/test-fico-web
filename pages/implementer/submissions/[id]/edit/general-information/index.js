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

function GeneralInformation({ client, query }) {
  const submissionId = query.id

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
    await setSave(state, setState, updateSubmission, submissionId)
  }, [state])

  const isCall = useCallback(() => {
    return getIsCall(data, state)
  }, [data, state])

  const injectActions = useMemo(() => ({
    updateGeneralInformation,
    isCall,
    loading,
    error,
    data,
  }), [state, loading])

  return (
    <PageContext.Provider value={pageData({ save, step: 0 })}>
      <CommentsProvider
        readOnly
        submission={data?.Submission}>
        <ImplementerSubmissionContext.Provider value={injectActions}>
          <Layout>
            <SaveHeader isSaving={state.isSaving} save={save} />
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

export async function getServerSideProps({ query }){
  return {
    props: { query }
  }
}

export default withApollo(GeneralInformation)
