import { Layout } from "../../../../../components/implementer/submissions"
import {
  ProjectDetails,
  DevelopmentObjectives,
  Beneficiaries
} from "../../../../../components/implementer/submissions/new/general-information"
import { data as pageData, ImplementerSubmissionContext } from "../../../../../contexts/implementer/submissions/new"
import { PageContext } from "../../../../../contexts/page"
import { submission } from "../../../../../graphql/submission"
import { useState, useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../helpers/withApollo"


function GeneralInformation({ client }) {
  const [state, setState] = useState({ generalInformation: {} })
  const [updateSubmission] = useMutation(submission.mutations.updateById, { client: client })
  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: "1" }
  })

  const updateGeneralInformation = useCallback(generalInformation => {
    const newGeneralInformation = { ...state.generalInformation, ...generalInformation }

    setState({...state, generalInformation: newGeneralInformation})
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

  const injectActions = useMemo(() => ({
    updateGeneralInformation,
    save,
    isCall,
    loading,
    error,
    data
  }), [state, loading])

  return (
    <PageContext.Provider value={pageData({ save })}>
      <ImplementerSubmissionContext.Provider value={injectActions}>
        <Layout>
          <ProjectDetails />
          <DevelopmentObjectives />
          <Beneficiaries />
        </Layout>
      </ImplementerSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export default withApollo(GeneralInformation)
