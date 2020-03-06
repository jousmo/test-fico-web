import { Layout } from "../../../components/shared"
import { PageContext } from "../../../contexts/page"
import { context } from "./context"
import { GeneralInformation } from "../../../components/implementer/profile"
import { Row, Col } from "antd"

export default function Profile() {
  return (
    <PageContext.Provider value={context}>
      <Layout>
        <GeneralInformation />
      </Layout>
    </PageContext.Provider>
  )
}
