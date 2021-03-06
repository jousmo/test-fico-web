import { Layout } from "../../../../../../components/implementer/submissions"
import {
  data as pageData,
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import { PageContext } from "../../../../../../contexts/page"
import { submission } from "../../../../../../graphql/submission"
import { useMemo } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../../helpers/withApollo"
import {
  Heading,
  ActivitiesSchedule
} from "../../../../../../components/implementer/submissions/new/schedule"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"

function Schedule({ client, query }) {
  const { loading, error, data } = useQuery(submission.queries.getTechnicalSpecification, {
    client: client,
    variables: { id: query.id }
  })

  const injectActions = useMemo(() => ({
    loading,
    error,
    data
  }), [loading])

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

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "IMPLEMENTER")
}

export default withApollo(Schedule)
