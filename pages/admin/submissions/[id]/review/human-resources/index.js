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
import { useState, useCallback, useMemo, useEffect } from "react"
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


function HumanResources({ client, query }) {
  const submissionId = query.id

  const [state, setState] = useState({
    humanResources: {},
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

  const updateHumanResources = useCallback(humanResource => {
    setUpdateHumanResources(humanResource, state, setState)
  }, [state])

  const save = useCallback(async () => {
    await setSave(state, updateSubmission, state.submissionId)
  }, [state])

  const injectActions = useMemo(() => ({
    updateHumanResources,
    loading,
    error,
    data
  }), [state, loading])

  const readOnly = data?.Submission?.state === "PROJECT"

  return (
    <PageContext.Provider value={pageData({ save, step: 4 })}>
      <CommentsProvider
        submission={data?.Submission}
        update={updateHumanResources}>
        <ImplementerSubmissionContext.Provider value={injectActions}>
          <Layout>
            <SaveHeader save={save} disabled={readOnly} />
            <Heading />
            <ResourcesList />
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

export default withApollo(HumanResources)
