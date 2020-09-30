import { Layout } from "../../../components/shared"
import { AdminUserContext } from "../../../contexts/admin/users"
import { user } from "../../../graphql/user"
import { useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../helpers/withApollo"
import { PageContext } from "../../../contexts/page"
import { AuthCheck } from "../../../helpers/auth/auth-check"
import { Users } from "../../../components/admin/users"
import { loadingAlert, success, warning } from "../../../helpers/alert"

function AdminUsers({ client }) {
  const { loading, error, data } = useQuery(user.queries.getAll, {
    client: client
  })

  const [createAccount] = useMutation(
    user.mutations.createAccount, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: user.queries.getAll
        }
      ]
    }
  )

  const save = useCallback(async account => {
    const saving = loadingAlert()
    try {
      await createAccount({ variables: { data: account } })
      success()
    } catch (e) {
      warning()
      console.error(e)
    }
    saving()
  }, [createAccount])

  const injectActions = useMemo(() => ({
    loading,
    error,
    data,
    save
  }), [loading, data])

  return (
    <PageContext.Provider value={{ type: "admin", step: "users", submenu: "users" }}>
      <AdminUserContext.Provider value={injectActions}>
        <Layout subheader={false}>
          <Users />
        </Layout>
      </AdminUserContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(AdminUsers)
