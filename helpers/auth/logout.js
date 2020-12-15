import { message } from "antd"
import { firebase } from "./index"
import { destroyCookie } from "nookies"

export async function Logout() {
  const loggingOut = message.loading("Cerrando sesión")
  await firebase.auth().signOut()
  destroyCookie(null, "token")
  window.location.href = "/"
  loggingOut()
}
