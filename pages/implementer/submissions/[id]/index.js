import { Layout } from "../../../../components/shared"
import { useRouter } from "next/router"
import {
  SubmissionSummary,
  AgreementDocuments
} from "../../../../components/implementer/submissions/show"
import {
  ImplementerSubmissionContext
} from "../../../../contexts/implementer/submissions/show"
import { submission } from "../../../../graphql/submission"
import { useMemo } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../helpers"
import { PageContext } from "../../../../contexts/page"

function Submission({ client }) {
  const router = useRouter()
  const { loading, error, data, refetch } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: router.query.id }
  })

  const injectActions = useMemo(() => ({
    loading,
    router,
    error,
    data,
    client,
    refetch
  }), [loading, data])

  return (
    <PageContext.Provider
      value={{ type: "implementer", submenu: "submissions" }}>
      <ImplementerSubmissionContext.Provider value={injectActions}>
        <Layout subheader={<SubmissionSummary />}>
          <AgreementDocuments />
        </Layout>
      </ImplementerSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps({ query }){
  return {
    props: { query }
  }
}

export default withApollo(Submission)
