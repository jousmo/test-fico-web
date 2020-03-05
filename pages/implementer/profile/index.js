import { Layout } from "../../../components/shared"
import { PageContext } from "../../../contexts/page"
import { context } from "./context"

export default function Profile() {
  return (
    <PageContext.Provider value={context}>
      <Layout><div>Prueba</div></Layout>
    </PageContext.Provider>
  )
}
