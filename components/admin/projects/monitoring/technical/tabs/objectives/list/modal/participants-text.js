import { Typography } from "antd"

export function ParticipantsText() {
  return (
    <div style={{maxWidth: "450px", padding: "5px"}}>
      <Typography.Text strong>Asistentes</Typography.Text>
      <br />
      <Typography.Text>
        Personas que asisten a actividades (ninguna actividad
        puede tener beneficiarios)
      </Typography.Text>
      <br />
      <br />
      <Typography.Text strong>Beneficiarios</Typography.Text>
      <br />
      <Typography.Text>
        Personas que cumplen con los requisitos del perfil de
        beneficiario y que se ven beneficiadas directamente de
        la implementación de un proyecto.
      </Typography.Text>
    </div>
  )
}
