import { message } from "antd"

export function success(alert = "Guardado correctamente!"){
  message.success(alert)
}

export function warning(alert = "Hubo un error"){
  message.error(alert)
}
