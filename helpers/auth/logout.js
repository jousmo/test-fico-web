import { message } from "antd"
import { firebase } from "./index"

export async function Logout() {
  const loggingOut = message.loading("Cerrando sesión")
  await firebase.auth().signOut()
  window.location.href = "/"
  loggingOut()
}
