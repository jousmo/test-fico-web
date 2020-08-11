import { Layout } from "../../../../../../components/shared"
import { PageContext } from "../../../../../../contexts/page"
import { withApollo } from "../../../../../../helpers/withApollo"
import {
  TechnicalMonitoring
} from "../../../../../../components/admin/projects/monitoring"

function TechnicalMonitoringPage({ client }) {
  return (
    <PageContext.Provider
      value={{ type: "admin", step: "active", submenu: "projects" }}>
      <Layout subheader={false}>
        <TechnicalMonitoring />
      </Layout>
    </PageContext.Provider>
  )
}

export default withApollo(TechnicalMonitoringPage)
