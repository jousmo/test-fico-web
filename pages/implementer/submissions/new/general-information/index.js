import { Layout } from "../../../../../components/implementer/submissions"
import { ProjectDetails } from "../../../../../components/implementer/submissions/new/general-information"
import { data } from "../../../../../contexts/implementer/submissions/new"
import { PageContext } from "../../../../../contexts/page"


export default function GeneralInformation() {
  return (
    <PageContext.Provider value={data({ save: () => {} })}>
      <Layout>
        <ProjectDetails />
      </Layout>
    </PageContext.Provider>
  )
}
