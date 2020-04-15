import { Layout } from "../../../../../components/implementer/submissions"
import {
  data as pageData,
  ImplementerSubmissionContext
} from "../../../../../contexts/implementer/submissions/new"
import { PageContext } from "../../../../../contexts/page"
import { submission } from "../../../../../graphql/submission"
import { useState, useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../helpers/withApollo"
import {
  DevelopmentObjective,
  GeneralObjective
} from "../../../../../components/implementer/submissions/new/technical-specification"


function TechnicalSpecification({ client }) {
  const [state, setState] = useState({
    technicalSpecification: {},
    dirty: false
  })

  const [updateSubmission] = useMutation(
    submission.mutations.updateById, { client: client }
  )

  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: "1" }
  })

  const updateTechnicalSpecification = useCallback(technicalSpecification => {
    const newTechnicalSpecification = {
      ...state.technicalSpecification,
      ...technicalSpecification
    }

    setState({
      ...state,
      dirty: true,
      technicalSpecification: technicalSpecification
    })
  })

  const save = useCallback(async () => {
    try {
      const updatedSubmission = await updateSubmission({
        variables: { ...state.technicalSpecification, id: "1" }
      })

      /* TODO: Show feedback to the user */
    }
    catch(e) {
      console.error(e)
    }
  })

  const injectActions = useMemo(() => ({
    updateTechnicalSpecification,
    save,
    loading,
    error,
    data
  }), [state, loading])

  return (
    <PageContext.Provider value={pageData({ save, step: 1 })}>
      <ImplementerSubmissionContext.Provider value={injectActions}>
        <Layout fullHeight>
          <DevelopmentObjective />
          <GeneralObjective />
        </Layout>
      </ImplementerSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export default withApollo(TechnicalSpecification)
