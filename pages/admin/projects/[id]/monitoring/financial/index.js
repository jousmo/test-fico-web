import { Layout } from "../../../../../../components/shared"
import { PageContext } from "../../../../../../contexts/page"
import { withApollo } from "../../../../../../helpers/withApollo"
import {
  MonitoringFinancial
} from "../../../../../../components/admin/projects/monitoring"

function ProjectsList({ client }) {
  return (
    <PageContext.Provider
      value={{ type: "admin", step: "active", submenu: "projects" }}>
      {/*Todo: What context will you use ?*/}
      <Layout subheader={false}>
        <MonitoringFinancial />
      </Layout>
    </PageContext.Provider>
  )
}

export default withApollo(ProjectsList)
