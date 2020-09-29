import { Layout } from "../../../components/shared"
import { AdminUserContext } from "../../../contexts/admin/users"
import { user } from "../../../graphql/user"
import { useMemo, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../helpers/withApollo"
import { PageContext } from "../../../contexts/page"
import { AuthCheck } from "../../../helpers/auth/auth-check"

function AdminUsers({ client }) {
  const [ state ] = useState({
    submissionsList: {}
  })

  const { loading, error, data } = useQuery(user.queries.getAll, {
    client: client
  })

  const injectActions = useMemo(() => ({
    loading,
    error,
    data
  }), [state, loading])

  return (
    <PageContext.Provider value={{ type: "admin", step: "users", submenu: "users" }}>
      <AdminUserContext.Provider value={injectActions}>
        <Layout subheader={false}>
          <h1>Users</h1>
        </Layout>
      </AdminUserContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(AdminUsers)
