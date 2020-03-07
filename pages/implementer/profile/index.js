import { Layout } from "../../../components/shared"
import { PageContext } from "../../../contexts/page"
import { GeneralInformation } from "../../../components/implementer/profile"
import { data } from "../../../contexts/implementer/profile"
import { useReducer } from "react"
import { reducer } from "../../../contexts/implementer/profile/reducer"

export default function Profile() {
  const [state, dispatch] = useReducer(reducer)

  return (
    <PageContext.Provider value={data}>
      <ImplementerProfileContext.Provider value={dispatch}>
        <Layout>
          <GeneralInformation />
        </Layout>
      </ImplementerProfileContext.Provider>
    </PageContext.Provider>
  )
}
