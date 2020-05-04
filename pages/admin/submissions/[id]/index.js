import { Layout } from "../../../../components/shared"
import { useRouter } from "next/router"
import {
  AgreementDocumentsContainer,
  Attachments,
  GeneralInformation,
  SignedAgreement,
  SubmissionSummary,
  Status
} from "../../../../components/admin/submissions/show"
import { PageContext } from "../../../../contexts/page"
import {
  data as contextData,
  AdminSubmissionContext
} from "../../../../contexts/admin/submissions/show"
import { submission } from "../../../../graphql/submission"
import { useCallback, useMemo, useState } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../helpers/withApollo"

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
      const updatedSubmission = await updateSubmission({
        variables: { ...state.submissionDetail, id: router.query.id }
      })

      /* TODO: Show feedback to the user */
    }
    catch(e) {
      console.error(e)
    }
  })

  const injectActions = useMemo(() => ({
    updateSubmissionDetail,
    save,
    loading,
    error,
    data
  }), [state, loading])

  return (
    <AdminSubmissionContext.Provider value={injectActions}>
      <Layout subheader={<SubmissionSummary />}>
        <GeneralInformation />
        <Status />
        <AgreementDocumentsContainer />
        <Attachments />
        <SignedAgreement />
      </Layout>
    </AdminSubmissionContext.Provider>
  )
}

export default withApollo(Submission)
