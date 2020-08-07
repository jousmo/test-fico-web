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
import { useCallback, useMemo, useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { withApollo, success, warning } from "../../../../helpers"
import { PageContext } from "../../../../contexts/page"

function Submission({ client }) {
  const router = useRouter()
  const submissionId = router.query.id

  const [state, setState] = useState({
    documentsAgreement: [],
    submissionId: submissionId
  })

  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: submissionId }
  })

  const [updateSubmission] = useMutation(
    submission.mutations.updateById, { client: client }
  )

  const save = useCallback(async (newDocumentsAgreement) => {
    try {
      await updateSubmission({
       variables: { data: { documentsAgreement: newDocumentsAgreement }, id: state.submissionId }
      })
      success("Documento guardado correctamente")
    } catch(e) {
      console.error(e)
      warning("Hubo un error al subir el documento")
    }
  }, [])

  const updateDocumentAgreement = useCallback(documentsAgreement => {
    const newDocumentsAgreement = [ ...state.documentsAgreement, documentsAgreement ]
    setState({ ...state, documentsAgreement: newDocumentsAgreement })
    save(newDocumentsAgreement)
  }, [state, setState])

  const injectActions = useMemo(() => ({
    updateDocumentAgreement,
    loading,
    router,
    error,
    data
  }), [state, loading])

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

export default withApollo(Submission)
