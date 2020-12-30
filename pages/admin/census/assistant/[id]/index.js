import { Layout } from "../../../../../components/shared"
import { AdminSubmissionContext } from "../../../../../contexts/admin/submissions/show"
import { PageContext } from "../../../../../contexts"
import { withApollo } from "../../../../../helpers"
import { AuthCheck } from "../../../../../helpers/auth/auth-check"
import { useQuery } from "@apollo/react-hooks"
import { census } from "../../../../../graphql"
import React, { useMemo } from "react"
import CensusAssistantDetail from "../../../../../components/admin/assistant"

function CensusBeneficiary({ client, query }) {
  const { loading, error, data } = useQuery(census.queries.getAssistantById, {
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
          <CensusAssistantDetail
            data={data}
            error={error}
            isLoading={loading} />
        </Layout>
      </AdminSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(CensusBeneficiary)
