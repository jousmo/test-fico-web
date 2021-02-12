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


function HumanResources({ client, query }) {
  const [form] = Form.useForm()
  const [state, setState] = useState({
    humanResources: [],
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

  const { loading, error, data } = useQuery(submission.queries.getConcepts, {
    client: client,
    variables: { id: query.id }
  })

  const updateHumanResources = useCallback(humanResources => {
    setState({ ...state, humanResources })
  }, [state])

  const save = useCallback(async () => {
    const { humanResources } = state
    await setSave(humanResources, setState, updateSubmission)
  }, [state])

  const injectActions = useMemo(() => ({
    updateHumanResources,
    loading,
    error,
    form,
    data
  }), [state, loading, data])

  const readOnly = data?.SubmissionSimple?.state === "PROJECT"
  const commentSubmission = { concepts: data?.Concepts, status: data?.SubmissionSimple?.status }

  return (
    <PageContext.Provider value={pageData({ save, step: 4 })}>
      <CommentsProvider
        submission={commentSubmission}
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
