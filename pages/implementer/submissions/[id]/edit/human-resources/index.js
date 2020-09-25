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
  Heading,
  ResourcesList
} from "../../../../../../components/implementer/submissions/new/human-resources"
import {
  setSave,
  setUpdateHumanResources
} from "../../../../../../helpers/submissionFunctions/human-resources"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"


function HumanResources({ client, query }) {
  const submissionId = query.id

  const [state, setState] = useState({
    humanResources: {},
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

  const updateHumanResources = useCallback(humanResource => {
    setUpdateHumanResources(humanResource, state, setState)
  }, [state])

  const save = useCallback(async () => {
    await setSave(state, setState, updateSubmission, submissionId)
  }, [state])


  const readOnly = data?.Submission?.state === "PROJECT"
  const hiddenComments = data?.Submission?.status === "CREATED"

  const injectActions = useMemo(() => ({
    updateHumanResources,
    loading,
    error,
    data,
    hiddenComments
  }), [state, loading])

  return (
    <PageContext.Provider value={pageData({ save, step: 4 })}>
      <CommentsProvider
        readOnly
        submission={data?.Submission}>
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
  return AuthCheck(ctx, "IMPLEMENTER")
}

export default withApollo(HumanResources)
