import { Layout } from "../../../../../../components/implementer/submissions"
import { useRouter } from "next/router"
import {
  data as pageData,
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import { PageContext } from "../../../../../../contexts/page"
import { submission } from "../../../../../../graphql/submission"
import { useState, useMemo } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../../helpers/withApollo"
import {
  Heading,
  ActivitiesSchedule
} from "../../../../../../components/implementer/submissions/new/schedule"

function Schedule({ client }) {
  const router = useRouter()
  const [state] = useState({
    schedule: {},
    dirty: false
  })

  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: router.query.id }
  })

  const injectActions = useMemo(() => ({
    loading,
    error,
    data,
    router
  }), [state, loading])

  return (
    <PageContext.Provider value={pageData({ step: 3 })}>
      <ImplementerSubmissionContext.Provider value={injectActions}>
        <Layout>
          <Heading />
          <ActivitiesSchedule />
        </Layout>
      </ImplementerSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export default withApollo(Schedule)
