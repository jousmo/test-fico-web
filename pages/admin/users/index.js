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

  const [recoveryAccountPassword] = useMutation(
    user.mutations.recoveryAccountPassword, {
      client: client
    }
  )

  const [updateAccount] = useMutation(
    user.mutations.updateAccount, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: user.queries.getAll
        }
      ]
    }
  )

  const [disabledAccount] = useMutation(
    user.mutations.disabledAccount, {
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
    const saving = loadingAlert("Creando cuenta", 0)
    try {
      await createAccount({ variables: { data: account } })
      success("Cuenta creada", 0)
    } catch (e) {
      warning()
      console.error(e)
    }
    saving()
  }, [createAccount])

  const recovery = useCallback(async email => {
    const saving = loadingAlert("Enviando correo de recuperación", 0)
    try {
      await recoveryAccountPassword({ variables: { email } })
      success("Correo de recuperación enviado")
    } catch (e) {
      warning()
      console.error(e)
    }
    saving()
  }, [recoveryAccountPassword])

  const update = useCallback(async id => {
    const saving = loadingAlert("Cambiando tu cuenta a implementadora", 0)
    try {
      await updateAccount({ variables: { id, role: "IMPLEMENTER" } })
      success("Cuenta actualizada")
    } catch (e) {
      warning()
      console.error(e)
    }
    saving()
  }, [updateAccount])

  const disabled = useCallback(async (id, status) => {
    const saving = loadingAlert(status ? "Desactivando cuenta" : "Activando cuenta", 0)
    try {
      await disabledAccount({ variables: { id, disabled: status } })
      success(status ? "Cuenta desactivada" : "Cuenta activada")
    } catch (e) {
      warning()
      console.error(e)
    }
    saving()
  }, [disabledAccount])

  const injectActions = useMemo(() => ({
    loading,
    error,
    data,
    save,
    recovery,
    update,
    disabled
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