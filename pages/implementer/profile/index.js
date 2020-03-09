import { Layout } from "../../../components/shared"
import { PageContext } from "../../../contexts/page"
import { GeneralInformation } from "../../../components/implementer/profile"
import { data, ImplementerProfileContext } from "../../../contexts/implementer/profile"
import { useState, useCallback, useMemo } from "react"

export default function Profile() {
  const [state, setState] = useState({ generalInformation: {} })

  const updateGeneralInformation = useCallback(generalInformation => {
    const newGeneralInformation = { ...state.generalInformation, ...generalInformation }

    setState({...state, generalInformation: newGeneralInformation})
  })

  const save = useCallback(() => {
    console.log(state)
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
