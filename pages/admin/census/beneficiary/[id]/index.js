import { Layout } from "../../../../../components/shared"
import { AdminSubmissionContext } from "../../../../../contexts/admin/submissions/show"
import { PageContext } from "../../../../../contexts"
import { withApollo } from "../../../../../helpers"
import { AuthCheck } from "../../../../../helpers/auth/auth-check"
import { useQuery } from "@apollo/react-hooks"
import { census } from "../../../../../graphql"
import { useMemo } from "react"
import { CensusBeneficiaryDetail } from "../../../../../components/admin/census/beneficiary"

function CensusBeneficiary({ client, query }) {
  const { loading, error, data } = useQuery(census.queries.getBeneficiaryById, {
    client: client,
    variables: { id: query?.id }
  })

  const injectActions = useMemo(() => ({
    loading,
    error,
    data
  }), [loading, data])

  return (
    <PageContext.Provider value={{ type: "admin", step: "census", submenu: "census" }}>
      <AdminSubmissionContext.Provider value={injectActions}>
        <Layout subheader={false}>
          <CensusBeneficiaryDetail />
        </Layout>
      </AdminSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(CensusBeneficiary)
