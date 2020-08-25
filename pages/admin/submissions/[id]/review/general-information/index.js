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
  data as pageData
} from "../../../../../../contexts/admin/submissions/review"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import { PageContext } from "../../../../../../contexts/page"
import { submission } from "../../../../../../graphql/submission"
import { useState, useCallback, useMemo, useEffect } from "react"
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
    submissionId: undefined
  })

  useEffect(() => {
    setState(state => (
      { ...state, submissionId }
    ))
  }, [submissionId])

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
    await setSave(state, updateSubmission, state.submissionId)
  }, [state])

  const isCall = useCallback(() => {
    return getIsCall(data, state)
  }, [data, state])

  const injectActions = useMemo(() => ({
    updateGeneralInformation,
    isCall,
    loading,
    error,
    data
  }), [state, loading])

  const readOnly = data?.Submission?.state === "PROJECT"

  return (
    <PageContext.Provider value={pageData({ save, step: 0 })}>
      <CommentsProvider
        submission={data?.Submission}
        update={updateGeneralInformation}>
        <ImplementerSubmissionContext.Provider value={injectActions}>
          <Layout>
            <SaveHeader save={save} disabled={readOnly} />
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
