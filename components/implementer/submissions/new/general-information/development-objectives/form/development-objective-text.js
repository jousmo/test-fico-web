import { Typography } from "antd"

export function DevelopmentObjectiveText() {
  return (
    <div style={{maxWidth: "400px", padding: "10px"}}>
      <Typography.Title level={4}>Objetivo de Desarrollo</Typography.Title>
      <Typography.Text>
        Su misión es evitar que la problemática identificada
        tenga consecuencias si no es atendida. Responde a la pregunta ¿Cuál es
        la contribución del programa o proyecto, en el mediano y largo plazo al
        logro de un objetivo superior?
      </Typography.Text>
    </div>
  )
}
