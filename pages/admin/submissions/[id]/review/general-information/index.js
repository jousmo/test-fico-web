import { Layout } from "../../../../../../components/implementer/submissions"
import { useRouter } from "next/router"
import {
  ProjectDetails,
  DevelopmentObjectives,
  Beneficiaries,
  Consultant
} from "../../../../../../components/implementer/submissions/new/general-information"
import {
  data as pageData
} from "../../../../../../contexts/admin/submissions/review"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/new"
import { PageContext } from "../../../../../../contexts/page"
import { submission } from "../../../../../../graphql/submission"
import { useState, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../../helpers/withApollo"
import {
  CommentsProvider
} from "../../../../../../contexts/admin/submissions/review/comments"
import {
  getIsCall,
  getHasConsultant,
  getHasConsultantReceivedSuppors,
  setSave,
  setUpdateGeneralInformation
} from "../../../../../implementer/submissions/helpers"


function GeneralInformation({ client }) {
  const router = useRouter()
  const [state, setState] = useState({
    generalInformation: {
      consultant: {}
    },
    dirty: false
  })

  const [updateSubmission] = useMutation(
    submission.mutations.updateById, { client: client }
  )

  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: router.query.id }
  })

  const updateGeneralInformation = setUpdateGeneralInformation(state, setState)

  const save = setSave(state, updateSubmission)

  const isCall = getIsCall(data, state)

  const hasConsultant = getHasConsultant(data, state)

  const hadConsultantReceivedSupports =
    getHasConsultantReceivedSuppors(data, state)

  const injectActions = useMemo(() => ({
    updateGeneralInformation,
    save,
    isCall,
    hasConsultant,
    hadConsultantReceivedSupports,
    loading,
    error,
    data
  }), [state, loading])

  return (
    <PageContext.Provider value={pageData({ save, step: 0 })}>
      <CommentsProvider>
        <ImplementerSubmissionContext.Provider value={injectActions}>
          <Layout>
            <ProjectDetails />
            <Consultant />
            <DevelopmentObjectives />
            <Beneficiaries />
          </Layout>
        </ImplementerSubmissionContext.Provider>
      </CommentsProvider>
    </PageContext.Provider>
  )
}

export default withApollo(GeneralInformation)
