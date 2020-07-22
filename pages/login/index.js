import {
  LoginContainer
} from "../../components/auth/login"
import {
  AuthSubmissionContext
} from "../../contexts/auth"
import { useMemo } from "react"
import { useQuery } from "@apollo/react-hooks"
import { submission } from "../../graphql/submission"
import { withApollo } from "../../helpers/withApollo"

function Login({ client }) {

  const login = async (values) => {
    // Todo: Update login logic once server authentication is running
  }

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
