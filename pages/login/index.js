import { useRouter } from "next/router"
import { LoginContainer } from "../../components/auth/login"
import { AuthSubmissionContext } from "../../contexts/auth"
import { useMemo, useEffect } from "react"
import { withApollo } from "../../helpers/withApollo"
import { Authenticate } from "../../helpers/auth/login"

function Login() {
  const router = useRouter()

  const login = async ({ email, password }) => {
    Authenticate(email, password, router)
  }

  useEffect(() => {
    const {
      expirationTime,
      claims: { role }
    } = JSON.parse(localStorage.getItem("user"))
    if (new Date(expirationTime) > new Date()){
      router.push(`/${role.toLowerCase()}/submissions`)
    }
  }, [])

  const injectActions = useMemo(() => ({
    login
  }), [])

  return (
    <AuthSubmissionContext.Provider value={injectActions}>
      <LoginContainer />
    </AuthSubmissionContext.Provider>
  )
}

export default withApollo(Login)
