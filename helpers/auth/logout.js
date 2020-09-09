import { message } from "antd"
import { auth } from "./index"

export function Logout() {
  const loggingOut = message.loading("Cerrando sesión")
  auth.signOut().then(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/"
    loggingOut()
  }).catch(error => {
    message.error("Error al cerrar sesión")
    console.error("Error singing out", error)
  })
}
