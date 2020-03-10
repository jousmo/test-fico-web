import { Layout } from "../../../components/shared"
import { PageContext } from "../../../contexts/page"
import { GeneralInformation } from "../../../components/implementer/profile"
import { data, ImplementerProfileContext } from "../../../contexts/implementer/profile"
import { useState, useCallback, useMemo } from "react"
import { withApollo } from "../../../helpers/withApollo"
import { implementer } from "../../../graphql"
import { useMutation } from "@apollo/react-hooks"

function Profile({client}) {
  const [state, setState] = useState({ generalInformation: {} })
  const [updateProfile] = useMutation(implementer.mutations.updateById, { client: client })

  const updateGeneralInformation = useCallback(generalInformation => {
    const newGeneralInformation = { ...state.generalInformation, ...generalInformation }

    setState({...state, generalInformation: newGeneralInformation})
  })

  const save = useCallback(async () => {
    try {
      const updatedProfile = await updateProfile({
        variables: { ...state.generalInformation, id: "1" }
      })

      console.log(updatedProfile)
    }
    catch(e) {
      console.log(e)
    }
  })

  const injectActions = useMemo(() => ({ updateGeneralInformation, save }), [state])

  return (
    <ImplementerProfileContext.Provider value={injectActions}>
      <PageContext.Provider value={data(injectActions)}>
        <Layout>
          <GeneralInformation />
        </Layout>
      </PageContext.Provider>
    </ImplementerProfileContext.Provider>
  )
}

export default withApollo(Profile)
