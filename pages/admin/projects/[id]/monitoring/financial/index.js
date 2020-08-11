import { Layout } from "../../../../../../components/shared"
import { PageContext } from "../../../../../../contexts/page"
import { withApollo } from "../../../../../../helpers/withApollo"
import {
  MonitoringFinancial
} from "../../../../../../components/admin/projects/monitoring"

function FinancialMonitoringPage({ client }) {
  return (
    <PageContext.Provider
      value={{ type: "admin", step: "active", submenu: "projects" }}>
      <Layout subheader={false}>
        <MonitoringFinancial />
      </Layout>
    </PageContext.Provider>
  )
}

export default withApollo(FinancialMonitoringPage)
