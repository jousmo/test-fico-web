import { Section } from "../../../../../shared"
import { Typography } from "antd"

export function Heading() {
  return (
    <Section fullWidth>
      <Typography.Text>Recursos Humanos</Typography.Text>
      <br />
      <Typography.Text type="secondary">
        Registra a cada miembro que será parte de la implementación de este
        proyecto, ten en cuenta que ya los debiste registrar en el presupuesto.
      </Typography.Text>
    </Section>
  )
}
