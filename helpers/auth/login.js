import { message } from "antd"
import { auth } from "./index"

export function Authenticate(email, password, router) {
  const loggingIn = message.loading("Iniciando sesión")
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      auth.currentUser.getIdTokenResult().then(res => {
        loggingIn()
        message.success("Iniciado exitosamente")
        const { claims } = res
        localStorage.setItem("user", JSON.stringify(res))

        if (claims.role === "ADMIN"){
          router.push("/admin/submissions")
        } else {
          router.push("/implementer/submissions")
        }
      })
    }).catch(error => {
    message.error("Error al iniciar sesión")
    console.error("Error signing in with password and email", error)
  })
}
