import { Layout } from "../../../../components/implementer/submissions"
import { PageContext } from "../../../../contexts/page"
import { data } from "../../../../contexts/implementer/submissions/new"

export default function New() {
  return (
    <PageContext.Provider value={data({ save: () => {} })}>
      <Layout>
      </Layout>
    </PageContext.Provider>
  )
}
