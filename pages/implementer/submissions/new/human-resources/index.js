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
    const newHumanResources = {
      ...state.humanResources,
      ...humanResource
    }

    setState({
      ...state,
      dirty: true,
      humanResources: newHumanResources
    })
  })

  const save = useCallback(async () => {
    try {
      const updatedSubmission = await updateSubmission({
        variables: { ...state.humanResources, id: "1" }
      })

      /* TODO: Show feedback to the user */
    }
    catch(e) {
      console.error(e)
    }
  })

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
