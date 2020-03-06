import { Layout } from "../../../components/shared"
import { PageContext } from "../../../contexts/page"
import { GeneralInformation } from "../../../components/implementer/profile"
import { data } from "../../../contexts/implementer/profile"

export default function Profile() {
  return (
    <PageContext.Provider value={data}>
      <Layout>
        <GeneralInformation />
      </Layout>
    </PageContext.Provider>
  )
}
