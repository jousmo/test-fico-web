import { Layout } from "../../../../components/shared"
import { PageContext } from "../../../../contexts/page"
import { useRouter } from "next/router"
import {
  AgreementDocumentsContainer,
  Attachments,
  GeneralInformation,
  SignedAgreement
} from "../../../../components/admin/submissions/show"
import {
  data as contextData,
  AdminSubmissionContext
} from "../../../../contexts/admin/submissions/show"
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
    <AdminSubmissionContext.Provider value={injectActions}>
      <PageContext.Provider value={contextData(injectActions)}>
        <Layout>
          <GeneralInformation />
          <AgreementDocumentsContainer />
          <Attachments />
          <SignedAgreement />
        </Layout>
      </PageContext.Provider>
    </AdminSubmissionContext.Provider>
  )
}

export default withApollo(Submission)
