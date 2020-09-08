import { Layout } from "../../../../components/shared"
import { success, warning, loadingAlert } from "../../../../helpers"
import {
  AgreementDocuments,
  Attachments,
  Beneficiaries,
  GeneralInformation,
  SignedAgreement,
  SubmissionSummary,
  Status
} from "../../../../components/admin/submissions/show"
import { AdminSubmissionContext } from "../../../../contexts/admin/submissions/show"
import { submission } from "../../../../graphql/submission"
import { useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../helpers/withApollo"
import { PageContext } from "../../../../contexts/page"

function Submission({ client, query }) {
  const submissionId = query.id

  const [ updateSubmission ] = useMutation(
    submission.mutations.updateById, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getById,
          variables: { id: submissionId }
        }
      ]
    }
  )

  const { loading, error, data, refetch } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: submissionId }
  })

  const save = useCallback(async submissionData => {
    const saving = loadingAlert()
    try {
      await updateSubmission({
        variables: { data: submissionData, id: submissionId }
      })
      success()
    }
    catch (e) {
      console.error(e)
      warning()
    }
    saving()
  }, [submissionId])

  const injectActions = useMemo(() => ({
    refetch,
    loading,
    client,
    error,
    save,
    data
  }), [loading, data])

  return (
    <PageContext.Provider
      value={{
        type: "admin",
        submenu: "submissions"
      }}>
      <AdminSubmissionContext.Provider value={injectActions}>
        <Layout subheader={<SubmissionSummary />}>
          <GeneralInformation />
          <Beneficiaries />
          <Status />
          <AgreementDocuments />
          <Attachments />
          <SignedAgreement />
        </Layout>
      </AdminSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps({ query }){
  return {
    props: { query }
  }
}

export default withApollo(Submission)
