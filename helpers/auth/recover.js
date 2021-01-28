import { message } from "antd"
import { firebase } from "./index"

export async function Recover(email) {
  const sending = message.loading("Enviando...", 0)
  try {
    await firebase.auth().sendPasswordResetEmail(email, { url: process.env.NEXT_PUBLIC_WEB_URL })
    message.success("Correo de recuperación enviado.")
  } catch (e) {
    message.error("Hubo un error...")
    console.error("Error recovering password", e)
  }
  sending()
}
