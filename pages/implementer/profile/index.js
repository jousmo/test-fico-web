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
    variables: { id: "db183c7b-b8f9-46e1-a401-13d8299956d0" }
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
          id: "db183c7b-b8f9-46e1-a401-13d8299956d0"
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
  }, [state])

  const addDocument = useCallback((file, type, docs) => {
    const { name, url } = file
    const doc = { name, url, type }

    const documents = Array.from(docs) || []
    const index = documents?.findIndex(doc => doc.type === type)

    if(index >= 0){
      documents[index] = doc
    } else {
      documents.push(doc)
    }

    updateGeneralInformation({ documents })
  }, [updateGeneralInformation])

  const removeDocument = useCallback((docs, type) => {
    let documents = Array.from(docs) || []
    const index = documents?.findIndex(doc => doc.type === type)

    if (index >= 0){
      if (documents.length === 1){
        documents = []
      } else {
        documents.splice(index, 1)
      }
      updateGeneralInformation({ documents })
    }
  }, [updateGeneralInformation])

  const injectActions = useMemo(() => ({
    updateGeneralInformation,
    removeDocument,
    isGovernment,
    addDocument,
    loading,
    error,
    save,
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
