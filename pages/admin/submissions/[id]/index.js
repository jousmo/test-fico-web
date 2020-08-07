import { Layout } from "../../../../components/shared"
import { success, warning } from "../../../../helpers"
import { useRouter } from "next/router"
import {
  AgreementDocuments,
  Attachments,
  Beneficiaries,
  GeneralInformation,
  SignedAgreement,
  SubmissionSummary,
  Status
} from "../../../../components/admin/submissions/show"
import {
  AdminSubmissionContext
} from "../../../../contexts/admin/submissions/show"
import { submission } from "../../../../graphql/submission"
import { useCallback, useMemo, useState } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../helpers/withApollo"
import { PageContext } from "../../../../contexts/page"

function Submission({ client }) {
  const router = useRouter()
  const [ state, setState ] = useState({
    submissionDetail: {}
  })

  const [ updateSubmission ] = useMutation(
    submission.mutations.updateById, { client: client }
  )

  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: router.query.id }
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
  })

  const save = useCallback(async () => {
    try {
      await updateSubmission({
        variables: { data: { ...state.submissionDetail }, id: router.query.id }
      })
      success()
    }
    catch(e) {
      console.error(e)
      warning()
    }
  })

  const injectActions = useMemo(() => ({
    updateSubmissionDetail,
    save,
    loading,
    error,
    data,
    client
  }), [state, loading])

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

export default withApollo(Submission)
