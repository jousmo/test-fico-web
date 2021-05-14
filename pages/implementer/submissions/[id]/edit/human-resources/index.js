import { Form } from "antd"
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
import { withApollo, warning, selectOptions } from "../../../../../../helpers"
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


function HumanResources({ client, query, token }) {
  const [form] = Form.useForm()

  const [state, setState] = useState({ isSaving: false })

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
    variables: { id: query.id },
    fetchPolicy: "network-only"
  })

  const save = useCallback(async () => {
    const { humanResources } = form.getFieldsValue()

    const hasDuplicates = humanResources
      ?.map(r => r.position)
      .some((p, i, a) => a.indexOf(p) !== i)

    if (hasDuplicates) {
      warning('El campo "Puesto" no debe repetirse')
      return
    }
    await setSave(state, setState, updateSubmission)
  }, [state])

  const { shared: { submissionStatusOptions: status }} = selectOptions
  const readOnly = data?.SubmissionSimple?.state === "PROJECT" ||
    status.findIndex(el => el.value === data?.SubmissionSimple?.status) > 8 ||
    (token?.role === "IMPLEMENTER" && data?.SubmissionSimple?.status.includes("REVIEW"))
  const hiddenComments = data?.SubmissionSimple?.status === "CREATED"

  const injectActions = useMemo(() => ({
    readOnly,
    loading,
    error,
    data,
    form,
    hiddenComments
  }), [state, loading, data])

  const commentSubmission = { concepts: data?.Concepts, status: data?.SubmissionSimple?.status }

  return (
    <PageContext.Provider value={pageData({ save, step: 4 })}>
      <CommentsProvider
        readOnly
        submission={commentSubmission}>
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
