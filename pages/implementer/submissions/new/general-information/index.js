import { Layout } from "../../../../../components/implementer/submissions"
import {
  ProjectDetails,
  DevelopmentObjectives,
  Beneficiaries,
  Consultant
} from "../../../../../components/implementer/submissions/new/general-information"
import { data as pageData, ImplementerSubmissionContext } from "../../../../../contexts/implementer/submissions/new"
import { PageContext } from "../../../../../contexts/page"
import { submission } from "../../../../../graphql/submission"
import { useState, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../helpers/withApollo"
import {
  getIsCall,
  getHasConsultant,
  getHasConsultantReceivedSuppors,
  setSave,
  setUpdateGeneralInformation
} from "../../helpers"


function GeneralInformation({ client }) {
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
    variables: { id: "1" }
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
      <ImplementerSubmissionContext.Provider value={injectActions}>
        <Layout>
          <ProjectDetails />
          <Consultant />
          <DevelopmentObjectives />
          <Beneficiaries />
        </Layout>
      </ImplementerSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export default withApollo(GeneralInformation)
