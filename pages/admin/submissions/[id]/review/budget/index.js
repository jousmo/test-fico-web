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
  Budget as BudgetTable
} from "../../../../../../components/implementer/submissions/new/technical-specification"
import {
  setSave,
  setUpdateBudget
} from "../../../../../../helpers/submissionFunctions/budget"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"


function Budget({ client, query }) {
  const submissionId = query.id

  const [state, setState] = useState({
    budget: {},
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

  const updateBudget = useCallback(budget => {
    setUpdateBudget(budget, state, setState)
  }, [state, setState])

  const save = useCallback(async () => {
    await setSave(state, setState, updateSubmission, submissionId)
  }, [state, updateSubmission])

  const injectActions = useMemo(() => ({
    updateBudget,
    loading,
    error,
    data,
    review: true
  }), [state, loading])

  const readOnly = data?.Submission?.state === "PROJECT"

  return (
    <PageContext.Provider value={pageData({ save, step: 2 })}>
      <CommentsProvider
        submission={data?.Submission}
        update={updateBudget}>
        <ImplementerSubmissionContext.Provider value={injectActions}>
          <Layout>
            <SaveHeader isSaving={state.isSaving} save={save} disabled={readOnly} />
            <BudgetTable />
          </Layout>
        </ImplementerSubmissionContext.Provider>
      </CommentsProvider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(Budget)
