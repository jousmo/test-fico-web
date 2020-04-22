import { Section } from "../../../../../shared"
import { Typography } from 'antd';

export function Heading() {
  return (
    <Section>
      <Typography.Text>Cronograma</Typography.Text>
      <br/>
      <Typography.Text type="secondary">
        Se muestra un resumen de todas las actividades agendadas, para ver el detalle coloca el ratón encima
        de una marca.
      </Typography.Text>
    </Section>
  )
}