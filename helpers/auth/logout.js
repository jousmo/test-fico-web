import { message } from "antd"
import { firebase } from "./index"
import nookies from "nookies"

export async function Logout() {
  const loggingOut = message.loading("Cerrando sesión")
  await firebase.auth().signOut()
  nookies.set(undefined, "token", "", {
    path: "/"
  })
  window.location.href = "/"
  loggingOut()
}
