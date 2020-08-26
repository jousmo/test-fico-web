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
import { success, warning, loadingAlert } from "../../../helpers/alert"

function Profile({ client }) {
  const [state, setState] = useState({ generalInformation: {} })
  const [updateProfile] = useMutation(implementer.mutations.updateById, {
    client: client
  })

  /* TODO: Update to use implementer id from application session */
  const { loading, error, data } = useQuery(implementer.queries.getById, {
    client: client,
    variables: { id: "d4f4b52c-71ff-4636-bd64-62e1e48e12ba" }
  })

  const updateGeneralInformation = useCallback(generalInformation => {
    const newGeneralInformation = { ...state.generalInformation, ...generalInformation }
    setState({...state, generalInformation: newGeneralInformation})
  }, [state])

  const save = useCallback(async () => {
    const saving = loadingAlert()
    try {
      await updateProfile({
        variables: {
          data: { ...state.generalInformation },
          id: "d4f4b52c-71ff-4636-bd64-62e1e48e12ba"
        }
      })
      success()
    }
    catch(e) {
      warning()
      console.error(e)
    }
    saving()
  }, [state, updateProfile])

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
