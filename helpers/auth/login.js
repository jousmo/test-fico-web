import { message } from "antd"
import { firebase } from "./index"

export async function Authenticate(email, password) {
  const loggingIn = message.loading("Iniciando sesión")
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    message.success("Iniciado exitosamente...")
    window.location.href = "/admin/submissions"
  } catch (e) {
    message.error("Error al iniciar sesión")
    console.error("Error signing in", e)
  }
  loggingIn()
}
