import { Section } from "../../../../../shared"
import { Typography } from 'antd';


export function Description() {
  const titles = {
    main: "Cronograma",
    secondary: "Se muestra un resumen de todas las actividades agendadas, para ver el detalle coloca el ratón encima " +
      "de una marca."
  }

  return (
    <Section>
      <Typography.Text>{titles.main}</Typography.Text>
      <br/>
      <Typography.Text type="secondary">
        {titles.secondary}
      </Typography.Text>
    </Section>
  )
}