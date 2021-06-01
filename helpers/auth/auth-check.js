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
    let { role: userRole } = token

    const readOnly = userRole === "ADMIN_ASSISTANT"

    if (!userRole.includes(role)) {
      if (userRole === "ADMIN_ASSISTANT") userRole = "ADMIN"
      return redirect(ctx, `/${userRole.toLowerCase()}/submissions`)
    }

    return { props: { query: ctx.query, token, readOnly } }
  } catch (err) {
    return redirect(ctx, "/")
  }
}
