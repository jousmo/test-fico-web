import { Layout } from "../../../../components/shared"
import { useRouter } from "next/router"
import {
  ProjectSummary,
  SignedAgreement
} from "../../../../components/admin/projects/show"
import {
  GeneralInformation
} from "../../../../components/admin/submissions/show/"
import {
  AdminSubmissionContext
} from "../../../../contexts/admin/submissions/show"
import { submission } from "../../../../graphql/submission"
import { useMemo, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../helpers/withApollo"

function Project({ client }) {
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
    <AdminSubmissionContext.Provider value={injectActions}>
      <Layout subheader={<ProjectSummary />}>
        <GeneralInformation />
        <SignedAgreement />
      </Layout>
    </AdminSubmissionContext.Provider>
  )
}

export default withApollo(Project)
