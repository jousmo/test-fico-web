import {
  Layout,
  SaveHeader
} from "../../../../../../components/implementer/submissions"
import { useRouter } from "next/router"
import {
  editData as pageData,
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
  Budget as BudgetTable
} from "../../../../../../components/implementer/submissions/new/technical-specification"
import {
  setSave,
  setUpdateBudget
} from "../../../../../../helpers/submissionFunctions/budget"


function Budget({ client }) {
  const router = useRouter()
  const submissionId = router.query.id

  const [state, setState] = useState({
    budget: {},
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
    variables: { id: router.query.id }
  })

  const updateBudget = useCallback(budget => {
    setUpdateBudget(budget, state, setState)
  }, [state, setState])

  const save = useCallback(async () => {
    await setSave(state, updateSubmission, state.submissionId)
  }, [state, updateSubmission])

  const injectActions = useMemo(() => ({
    updateBudget,
    loading,
    error,
    data,
    router
  }), [state, loading])

  return (
    <PageContext.Provider value={pageData({ save, step: 2 })}>
      <CommentsProvider
        readOnly
        submission={data?.Submission}>
        <ImplementerSubmissionContext.Provider value={injectActions}>
          <Layout>
            <SaveHeader save={save} />
            <BudgetTable />
          </Layout>
        </ImplementerSubmissionContext.Provider>
      </CommentsProvider>
    </PageContext.Provider>
  )
}

export default withApollo(Budget)
