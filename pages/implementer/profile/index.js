import { Layout, Visibility } from "../../../components/shared"
import { PageContext } from "../../../contexts/page"
import {
  GeneralInformation,
  OrganizationalChart,
  LegalDocuments,
  Government,
  Projects
} from "../../../components/implementer/profile"
import {
  data as contextData,
  ImplementerProfileContext
} from "../../../contexts/implementer/profile"
import { useState, useCallback, useMemo } from "react"
import { withApollo } from "../../../helpers/withApollo"
import { implementer } from "../../../graphql"
import { useMutation, useQuery } from "@apollo/react-hooks"

function Profile({ client }) {
  const [state, setState] = useState({ generalInformation: {} })
  const [updateProfile] = useMutation(implementer.mutations.updateById, {
    client: client
  })

  /* TODO: Update to use implementer id from application session */
  const { loading, error, data } = useQuery(implementer.queries.getById, {
    client: client,
    variables: { id: "f3f13a59-337e-4989-b010-d7713a53c3c2" }
  })

  const updateGeneralInformation = useCallback(generalInformation => {
    const newGeneralInformation = { ...state.generalInformation, ...generalInformation }

    setState({...state, generalInformation: newGeneralInformation})
  })

  const save = useCallback(async () => {
    try {
      const updatedProfile = await updateProfile({
        variables: {
          data: {...state.generalInformation},
          id: "f3f13a59-337e-4989-b010-d7713a53c3c2"
        }
      })

      /* TODO: Show feedback to the user */
    }
    catch(e) {
      console.error(e)
    }
  })

  const isGovernment = useCallback(() => {
    return state.generalInformation.type === "GOVERNMENT" ||
      data?.Implementer?.type === "GOVERNMENT"
  })

  const injectActions = useMemo(() => ({
    updateGeneralInformation,
    save,
    isGovernment,
    loading,
    error,
    data
  }), [state, loading])

  return (
    <ImplementerProfileContext.Provider value={injectActions}>
      <PageContext.Provider value={contextData(injectActions)}>
        <Layout>
          <GeneralInformation />
          <Projects />
          <LegalDocuments />
          <Visibility visible={!isGovernment()}>
            <Government />
          </Visibility>
          <Visibility visible={!isGovernment()}>
            <OrganizationalChart />
          </Visibility>
        </Layout>
      </PageContext.Provider>
    </ImplementerProfileContext.Provider>
  )
}

export default withApollo(Profile)
