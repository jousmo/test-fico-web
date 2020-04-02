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
import { useState, useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../helpers/withApollo"


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

  const updateGeneralInformation = useCallback(generalInformation => {
    const newGeneralInformation = {
      ...state.generalInformation,
      ...generalInformation
    }

    setState({...state, dirty: true, generalInformation: newGeneralInformation})
  })

  const save = useCallback(async () => {
    try {
      const updatedSubmission = await updateSubmission({
        variables: { ...state.generalInformation, id: "1" }
      })

      /* TODO: Show feedback to the user */
    }
    catch(e) {
      console.error(e)
    }
  })

  const isCall = useCallback(() => {
    return state.generalInformation.type === "CALL" ||
      data?.Submission?.type === "CALL"
  })

  const hasConsultant = useCallback(() => {
    const hasConsultant = state
      .generalInformation
      .hasConsultant
    
    const hasConsultantData = data
      ?.Submission
      ?.hasConsultant

    return hasConsultant === true ||
      (hasConsultantData === true && !state.dirty)
  })

  const hadConsultantReceivedSupports = useCallback(() => {
    const hadReceivedSupports = state
      .generalInformation
      .consultant
      .hadReceivedSupports
    
    const hadReceivedSupportsData = data
      ?.Submission
      ?.consultant
      ?.hadReceivedSupports

    return hadReceivedSupports === true ||
      (hadReceivedSupportsData === true && !state.dirty)
  })

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
