import { Layout } from "../../../../components/shared"
import { success, warning } from "../../../../helpers"
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
import { useCallback, useMemo, useState } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../helpers/withApollo"
import { PageContext } from "../../../../contexts/page"

function Submission({ client, query }) {
  const submissionId = query.id

  const [ state, setState ] = useState({
    submissionDetail: {}
  })

  const [ updateSubmission ] = useMutation(
    submission.mutations.updateById, { client: client }
  )

  const { loading, error, data, refetch } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: submissionId }
  })

  const updateSubmissionDetail = useCallback(submission => {
    const newSubmission = {
      ...state.submissionDetail,
      ...submission
    }

    setState({
      ...state,
      dirty: true,
      submissionDetail: newSubmission
    })
  }, [state])

  const save = useCallback(async () => {
    try {
      await updateSubmission({
        variables: { data: { ...state.submissionDetail }, id: submissionId }
      })
      success()
      await refetch()
    }
    catch(e) {
      console.error(e)
      warning()
    }
  }, [state, refetch])

  const saveApproveMonitoring = useCallback(async () => {
    try {
      await updateSubmission({
        variables: { data: { status: "AWAITING_INFO", state: "PROJECT" }, id: submissionId }
      })
      success("Solicitud aprobada correctamente")
      await push("/admin/submissions")
    }
    catch(e) {
      console.error(e)
      warning()
    }
  }, [state])

  const injectActions = useMemo(() => ({
    updateSubmissionDetail,
    save,
    saveApproveMonitoring,
    loading,
    error,
    data,
    client,
    refetch
  }), [state, loading, data])

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
