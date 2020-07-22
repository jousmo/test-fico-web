import {
  LoginContainer
} from "../../components/auth/login"
import {
  AuthSubmissionContext
} from "../../contexts/auth"
import { withApollo } from "../../helpers/withApollo"

function Login({ client }) {
  return (
    <AuthSubmissionContext.Provider value={[]}>
      <LoginContainer />
    </AuthSubmissionContext.Provider>
  )
}

export default withApollo(Login)
