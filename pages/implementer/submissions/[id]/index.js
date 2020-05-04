import { Layout } from "../../../../components/shared"
import { useRouter } from "next/router"
import {
  SubmissionSummary
} from "../../../../components/implementer/submissions/show"
import { PageContext } from "../../../../contexts/page"
import {
  data as contextData,
  ImplementerSubmissionContext
} from "../../../../contexts/implementer/submissions/show"
import { submission } from "../../../../graphql/submission"
import { useMemo, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../helpers/withApollo"

function Submission({ client }) {
  const router = useRouter()
  const [ state ] = useState({
    submissionDetail: {}
  })
  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: router.query.id }
  })

  const injectActions = useMemo(() => ({
    loading,
    error,
    data
  }), [state, loading])

  return (
    <ImplementerSubmissionContext.Provider value={injectActions}>
      <PageContext.Provider value={contextData(injectActions)}>
        <Layout subheader={<SubmissionSummary />}>
        </Layout>
      </PageContext.Provider>
    </ImplementerSubmissionContext.Provider>
  )
}

export default withApollo(Submission)
