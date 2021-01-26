import { Layout, Visibility } from "../../../components/shared"
import { PageContext } from "../../../contexts/page"
import {
  GeneralInformation,
  OrganizationalChart,
  LegalDocuments,
  BudgetSummary,
  Government,
  Projects
} from "../../../components/implementer/profile"
import {
  data as contextData,
  ImplementerProfileContext
} from "../../../contexts/implementer/profile"
import { useEffect, useState, useCallback, useMemo } from "react"
import { implementer } from "../../../graphql"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { success, loadingAlert, withApollo } from "../../../helpers"
import { AuthCheck } from "../../../helpers/auth/auth-check"
import { apolloError } from "../../../helpers/bugsnag/notify"

function Profile({ client }) {
  const [state, setState] = useState({ generalInformation: {} })
  const [updateProfile] = useMutation(implementer.mutations.updateById, {
    client: client,
    awaitRefetchQueries: true,
    refetchQueries: [{ query: implementer.queries.getById }]
  })

  const { loading, error, data } = useQuery(implementer.queries.getById, {
    client: client
  })

  useEffect(() => {
    if (data?.Implementer?.documents) {
      setState({
        generalInformation: { documents: [ ...data?.Implementer?.documents ]}
      })
    }
  }, [data?.Implementer])

  const updateGeneralInformation = useCallback(generalInformation => {
    const newGeneralInformation = { ...state.generalInformation, ...generalInformation }
    setState({...state, generalInformation: newGeneralInformation})
  }, [state])

  const save = useCallback(async () => {
    const saving = loadingAlert("Guardando", 0)
    try {
      await updateProfile({
        variables: { data: { ...state.generalInformation } }
      })
      saving()
      success()
    }
    catch(e) {
      apolloError(e)
    }
  }, [state, updateProfile])

  const isGovernment = useCallback(() => {
    return state.generalInformation.type === "GOVERNMENT" ||
      data?.Implementer?.type === "GOVERNMENT"
  }, [state])

  const addDocument = useCallback((file, type) => {
    const { name, url } = file
    const doc = { name, url, type }

    const documents = Array.from(state.generalInformation.documents) || []
    const index = documents?.findIndex(doc => doc.type === type)

    if(index >= 0){
      documents[index] = doc
    } else {
      documents.push(doc)
    }

    updateGeneralInformation({ documents })
  }, [state, updateGeneralInformation])

  const removeDocument = useCallback(type => {
    let documents = Array.from(state.generalInformation.documents) || []
    const index = documents?.findIndex(doc => doc.type === type)

    if (index >= 0){
      if (documents.length === 1){
        documents = []
      } else {
        documents.splice(index, 1)
      }
      updateGeneralInformation({ documents })
    }
  }, [state, updateGeneralInformation])

  const injectActions = useMemo(() => ({
    updateGeneralInformation,
    removeDocument,
    isGovernment,
    addDocument,
    loading,
    error,
    save,
    data
  }), [data, state, loading])

  return (
    <ImplementerProfileContext.Provider value={injectActions}>
      <PageContext.Provider value={contextData(injectActions)}>
        <Layout>
          <GeneralInformation />
          <Projects />
          <BudgetSummary />
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

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "IMPLEMENTER")
}

export default withApollo(Profile)
