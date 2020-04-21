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
  Description,
  ActivitiesSchedule
} from "../../../../../components/implementer/submissions/new/schedule"

function Schedule({ client }) {
  const [state, setState] = useState({
    schedule: {},
    dirty: false
  })

  const [updateSubmission] = useMutation(
    submission.mutations.updateById, { client: client }
  )

  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: "1" }
  })

  const updateSchedule = useCallback(schedule => {
    const newSchedule = {
      ...state.schedule,
      ...schedule
    }

    setState({...state, dirty: true, schedule: newSchedule})
  })

  const save = useCallback(async () => {
    try {
      const updatedSubmission = await updateSubmission({
        variables: { ...state.schedule, id: "1" }
      })

      /* TODO: Show feedback to the user */
    }
    catch(e) {
      console.error(e)
    }
  })

  const injectActions = useMemo(() => ({
    updateSchedule,
    save,
    loading,
    error,
    data
  }), [state, loading])

  return (
    <PageContext.Provider value={pageData({ save, step: 3 })}>
      <ImplementerSubmissionContext.Provider value={injectActions}>
        <Layout>
          <Description/>
          <ActivitiesSchedule/>
        </Layout>
      </ImplementerSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export default withApollo(Schedule)