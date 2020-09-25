import nookies from "nookies"
import { firebaseAdmin } from "../helpers/auth/admin"
import { LoginContainer } from "../components/auth/login"

export default function Login() {
  return (
    <LoginContainer />
  )
}

export async function getServerSideProps(ctx){
  try {
    const cookies = nookies.get(ctx)
    await firebaseAdmin.auth().verifyIdToken(cookies.token)

    ctx.res.writeHead(303, { Location: "/admin/submissions" })
    ctx.res.end()
    return { props: {} }
  } catch (err) {
    return { props: {} }
  }
}
