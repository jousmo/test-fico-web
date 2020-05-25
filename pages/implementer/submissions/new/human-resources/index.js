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
  Heading,
  ResourcesList
} from "../../../../../components/implementer/submissions/new/human-resources"
import {
  setSave,
  setUpdateHumanResources
} from "../../../../../helpers/submissionFunctions/human-resources"


function HumanResources({ client }) {
  const [state, setState] = useState({
    humanResources: {},
    dirty: false
  })

  const [updateSubmission] = useMutation(
    submission.mutations.updateById, { client: client }
  )

  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: "1" }
  })

  const updateHumanResources = useCallback(humanResource => {
    setUpdateHumanResources(humanResource, state, setState)
  }, [state])

  const save = useCallback(async () => {
    await setSave(state, updateSubmission, "1")
  }, [state])

  const injectActions = useMemo(() => ({
    updateHumanResources,
    save,
    loading,
    error,
    data
  }), [state, loading])

  return (
    <PageContext.Provider value={pageData({ save, step: 4 })}>
      <ImplementerSubmissionContext.Provider value={injectActions}>
        <Layout>
          <Heading />
          <ResourcesList />
        </Layout>
      </ImplementerSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export default withApollo(HumanResources)
