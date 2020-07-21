import {
  Layout,
  SaveHeader
} from "../../../../../../components/implementer/submissions"
import { useRouter } from "next/router"
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
  setSave,
  setUpdateTechnicalSpecification
} from "../../../../../../helpers/submissionFunctions/technical-specification"
import {
  DevelopmentObjective,
  GeneralObjective,
  SpecificObjectives
} from "../../../../../../components/implementer/submissions/new/technical-specification"


function TechnicalSpecification({ client }) {
  const router = useRouter()
  const submissionId = router.query.id

  const [state, setState] = useState({
    technicalSpecification: {},
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

  const updateTechnicalSpecification = useCallback(technicalSpecification => {
    setUpdateTechnicalSpecification(technicalSpecification, state, setState)
  }, [state])

  const save = useCallback(async () => {
    await setSave(state, updateSubmission, state.submissionId)
  }, [state])

  const injectActions = useMemo(() => ({
    updateTechnicalSpecification,
    loading,
    error,
    data,
    router
  }), [state, loading])

  return (
    <PageContext.Provider value={pageData({ save, step: 1 })}>
      <CommentsProvider
        submission={data?.Submission}
        update={updateTechnicalSpecification}>
        <ImplementerSubmissionContext.Provider value={injectActions}>
          <Layout>
            <SaveHeader save={save} />
            <DevelopmentObjective />
            <GeneralObjective />
            <SpecificObjectives />
          </Layout>
        </ImplementerSubmissionContext.Provider>
      </CommentsProvider>
    </PageContext.Provider>
  )
}

export default withApollo(TechnicalSpecification)
