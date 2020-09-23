import { firebaseAdmin } from "./admin"
import nookies from "nookies"

const redirect = (ctx, location) => {
  ctx.res.writeHead(303, { Location: location })
  ctx.res.end()
  return { props: {} }
}

export const AuthCheck = async (ctx, role) => {
  try {
    const cookies = nookies.get(ctx)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const { role: userRole } = token

    if (userRole !== role) {
      return redirect(ctx, `/${userRole.toLowerCase()}/submissions`)
    }

    return { props: {} }
  } catch (err) {
    return redirect(ctx, "/")
  }
}
