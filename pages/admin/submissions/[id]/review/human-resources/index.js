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
  const [state, setState] = useState({
    concepts: [],
    dirty: false,
    isSaving: false
  })

  const [updateSubmission] = useMutation(
    submission.mutations.updateHumanResources, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getBudget,
          variables: { id: query.id }
        }
      ]
    }
  )

  const { loading, error, data } = useQuery(submission.queries.getBudget, {
    client: client,
    variables: { id: query.id }
  })

  const updateHumanResources = useCallback(concepts => {
    setUpdateHumanResources(concepts, state, setState)
  }, [state])

  const save = useCallback(async () => {
    await setSave(state, setState, updateSubmission)
    setState({ ...state, concepts: [] })
  }, [state])

  const injectActions = useMemo(() => ({
    updateHumanResources,
    loading,
    error,
    data
  }), [state, loading, data])

  const readOnly = data?.Budget?.state === "PROJECT"

  return (
    <PageContext.Provider value={pageData({ save, step: 4 })}>
      <CommentsProvider
        submission={data?.Budget}
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
