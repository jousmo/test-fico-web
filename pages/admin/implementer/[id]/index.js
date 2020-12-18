import { Layout, Visibility } from "../../../../components/shared"
import { PageContext } from "../../../../contexts/page"
import {
  GeneralInformation,
  OrganizationalChart,
  LegalDocuments,
  BudgetSummary,
  Government,
  Projects
} from "../../../../components/implementer/profile"
import { ImplementerProfileContext } from "../../../../contexts/implementer/profile"
import { useEffect, useState, useCallback, useMemo } from "react"
import { withApollo } from "../../../../helpers/withApollo"
import { implementer } from "../../../../graphql"
import { useQuery } from "@apollo/react-hooks"
import { AuthCheck } from "../../../../helpers/auth/auth-check"

function Profile({ client, query }) {
  const [state, setState] = useState({ generalInformation: {} })

  const { loading, error, data } = useQuery(implementer.queries.getById, {
    client: client,
    variables: { id: query?.id }
  })

  useEffect(() => {
    if (data?.Implementer?.documents) {
      setState({
        generalInformation: { documents: [ ...data?.Implementer?.documents ]}
      })
    }
  }, [data?.Implementer])

  const isGovernment = useCallback(() => {
    return state.generalInformation.type === "GOVERNMENT" ||
      data?.Implementer?.type === "GOVERNMENT"
  }, [state])

  const injectActions = useMemo(() => ({
    disabled: true,
    isGovernment,
    loading,
    error,
    data
  }), [data, state, loading])

  return (
    <ImplementerProfileContext.Provider value={injectActions}>
      <PageContext.Provider value={{ type: "admin", title: `Perfil de la implementadora: ${data?.Implementer?.name}`}}>
        <Layout>
          <GeneralInformation />
          <Projects />
          <BudgetSummary />
          <LegalDocuments />
          <Visibility visible={!isGovernment()}>
            <Government />
          </Visibility>
          <Visibility visible={!isGovernment()}>
            <OrganizationalChart />
          </Visibility>
        </Layout>
      </PageContext.Provider>
    </ImplementerProfileContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(Profile)
