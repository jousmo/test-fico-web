import { Layout } from "../../../components/shared"
import { PageContext } from "../../../contexts/page"
import { GeneralInformation } from "../../../components/implementer/profile"
import { data, ImplementerProfileContext } from "../../../contexts/implementer/profile"
import { useState, useCallback, useMemo } from "react"

export default function Profile() {
  const [state, setState] = useState({ generalInformation: {} })

  const setGeneralInformation = useCallback(() =>
    generalInformation => {
      return setState(prevState => {
        return {
          ...prevState,
          generalInformation: {
            ...prevState.generalInformation,
            generalInformation
          }
        }
      })
    }
  )

  const injectActions = useMemo(() => { setGeneralInformation }, []) 

  return (
    <PageContext.Provider value={data}>
      <ImplementerProfileContext.Provider value={injectActions()}>
        <Layout>
          <GeneralInformation />
        </Layout>
      </ImplementerProfileContext.Provider>
    </PageContext.Provider>
  )
}
