import { message } from "antd"
import { auth } from "./index"

export function Logout(router) {
  const loggingOut = message.loading("Cerrando sesión")
  auth.signOut().then(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
    loggingOut()
  }).catch(error => {
    message.error("Error al cerrar sesión")
    console.error("Error signing in with password and email", error)
  })
}
